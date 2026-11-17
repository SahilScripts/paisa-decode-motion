"""Extract EVERY frame of one selected local interval onto readable consecutive sheets."""
import argparse
import json
import subprocess
from pathlib import Path
import numpy as np
from analyze_local import probe, sheet

p=argparse.ArgumentParser(description=__doc__)
p.add_argument("source",type=Path)
p.add_argument("output",type=Path)
p.add_argument("--start",type=float,required=True)
p.add_argument("--seconds",type=float,required=True)
a=p.parse_args()
a.output.mkdir(parents=True,exist_ok=True)
vs=next(s for s in probe(a.source)['streams'] if s['codec_type']=='video')
w=640;h=round(w*vs['height']/vs['width']/2)*2
start=round(a.start*60)/60
count=round(a.seconds*60)
proc=subprocess.Popen(['ffmpeg','-v','error','-ss',str(start),'-i',str(a.source),'-vf',f'fps=60,scale={w}:{h}',
    '-frames:v',str(count),'-pix_fmt','rgb24','-f','rawvideo','-'],stdout=subprocess.PIPE)
frames=[];n=0
while True:
    raw=proc.stdout.read(w*h*3)
    if not raw:break
    if len(raw)!=w*h*3:raise RuntimeError('Truncated frame')
    frame=round(start*60)+n
    frames.append((f'f{frame} / {frame/60:.4f}s',np.frombuffer(raw,np.uint8).reshape(h,w,3)))
    if len(frames)==60:
        sheet(frames,a.output/f'dense-{start:08.3f}-{n//60:03d}.jpg',cols=8,width=240)
        frames=[]
    n+=1
proc.stdout.close()
if proc.wait()!=0:raise RuntimeError('Decode failed')
if frames:sheet(frames,a.output/f'dense-{start:08.3f}-{n//60:03d}.jpg',cols=8,width=240)
(a.output/f'window-{start:08.3f}.json').write_text(json.dumps({'source':str(a.source.resolve()),'start':start,'end':start+n/60,
    'frames_extracted':n,'fps':60,'visual_review_status':'not yet recorded'},indent=2))
print(f'{n} consecutive frames extracted locally: {start:.3f}–{start+n/60:.3f}s')
