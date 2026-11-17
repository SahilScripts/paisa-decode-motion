"""Local-only 60 fps decoding, frame metrics, overview and consecutive-frame sheets.

python analyze_local.py VIDEO OUT [--start 0 --start 120 --seconds 3]
No network calls, AI API, OCR service, or cloud image processing.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import subprocess
from fractions import Fraction
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw


def probe(src):
    return json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(src)
    ]))


def sheet(frames, dst, cols=6, width=256):
    thumbs = []
    for label, frame in frames:
        im = Image.fromarray(frame)
        im.thumbnail((width, width))
        thumbs.append((label, im))
    ch = max(im.height for _, im in thumbs) + 23
    out = Image.new("RGB", (cols * width, ((len(thumbs)+cols-1)//cols)*ch), "#18202b")
    d = ImageDraw.Draw(out)
    for i, (label, im) in enumerate(thumbs):
        x, y = (i % cols)*width, (i//cols)*ch
        out.paste(im, (x, y+23))
        d.text((x+4, y+5), label, fill="white")
    out.save(dst, quality=90)


def analyze(src: Path, out: Path, starts: list[float], seconds: float, overview_step: float):
    out.mkdir(parents=True, exist_ok=True)
    meta = probe(src)
    vs = next(s for s in meta["streams"] if s["codec_type"] == "video")
    native = float(Fraction(vs["avg_frame_rate"]))
    width = 384
    height = round(width*vs["height"]/vs["width"] / 2)*2
    # Only temporal duplication/drop on a 60 Hz grid. Never generate interpolated images.
    proc = subprocess.Popen(["ffmpeg", "-v", "error", "-threads", "2", "-i", str(src),
        "-vf", f"fps=60,scale={width}:{height}:flags=area", "-pix_fmt", "rgb24", "-f", "rawvideo", "-"],
        stdout=subprocess.PIPE)
    size = width*height*3
    previous = None
    n = duplicates = 0
    cuts, overview, dense = [], [], {}
    page = 0
    with (out/"frames-60fps.jsonl").open("w") as log:
        while True:
            raw = proc.stdout.read(size)
            if not raw:
                break
            if len(raw) != size:
                raise RuntimeError("Incomplete decoded frame")
            rgb = np.frombuffer(raw, np.uint8).reshape(height, width, 3)
            gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
            delta = float(np.abs(gray.astype(np.int16)-previous).mean()) if previous is not None else 0
            duplicate = previous is not None and delta < .10
            duplicates += int(duplicate)
            # A heuristic candidate is not a confirmed editorial cut.
            cut = delta > 25
            if cut:
                cuts.append({"frame": n, "time": round(n/60, 6), "mean_delta": round(delta, 3)})
            log.write(json.dumps({"frame": n, "time": round(n/60, 6), "mean_delta": round(delta, 3),
                "near_duplicate": bool(duplicate), "cut_candidate": cut,
                "luma": round(float(gray.mean()), 3)})+"\n")
            if n % max(1, round(60*overview_step)) == 0:
                overview.append((f"{n/60:.2f}s / f{n}", rgb.copy()))
                if len(overview) == 36:
                    sheet(overview, out/f"overview-{page:03d}.jpg")
                    overview, page = [], page+1
            for start in starts:
                a, b = round(start*60), round((start+seconds)*60)
                if a <= n < b:
                    offset = n-a
                    key = (start, offset//60)
                    dense.setdefault(key, []).append((f"f{n} / {n/60:.4f}s", rgb.copy()))
                    if len(dense[key]) == 60:
                        sheet(dense.pop(key), out/f"dense-{start:08.3f}-{offset//60:03d}.jpg", cols=10, width=192)
            previous = gray.astype(np.int16)
            n += 1
    proc.stdout.close()
    if proc.wait() != 0:
        raise RuntimeError("FFmpeg decoding failed")
    if overview:
        sheet(overview, out/f"overview-{page:03d}.jpg")
    for (start, sec), frames in dense.items():
        sheet(frames, out/f"dense-{start:08.3f}-{sec:03d}.jpg", cols=10, width=192)
    summary = {"source": str(src.resolve()), "sha256": hashlib.sha256(src.read_bytes()).hexdigest(),
        "native_fps": native, "analysis_fps": 60, "width": vs["width"], "height": vs["height"],
        "frames_measured": n, "duration_measured": n/60, "near_duplicates": duplicates,
        "cut_candidates": cuts, "dense_windows_generated": [[x, min(x+seconds,n/60)] for x in starts],
        "visual_review_status": "not recorded; sheet generation is not visual review",
        "method": "FFmpeg + NumPy/OpenCV locally; all frames measured; no cloud image analysis"}
    (out/"summary.json").write_text(json.dumps(summary, indent=2))
    imgs = sorted(out.glob("*.jpg"))
    (out/"review.html").write_text('<!doctype html><meta charset="utf-8"><title>Local frame review</title>'
        '<style>body{background:#101419;color:white;font:16px system-ui}img{max-width:100%}figure{margin:20px 0}</style>'
        +f'<h1>{src.stem} · 60 fps local frame review</h1><p>Generated sheets; manually record reviewed intervals separately.</p>'
        +''.join(f'<figure><figcaption>{p.name}</figcaption><img loading="lazy" src="{p.name}"></figure>' for p in imgs))
    print(json.dumps({k:v for k,v in summary.items() if k != "cut_candidates"}))


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("video", type=Path)
    p.add_argument("out", type=Path)
    p.add_argument("--start", type=float, action="append")
    p.add_argument("--seconds", type=float, default=4)
    p.add_argument("--overview-step", type=float, default=8)
    args = p.parse_args()
    analyze(args.video, args.out, args.start or [0], args.seconds, args.overview_step)
