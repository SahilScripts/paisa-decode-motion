"""Download explicit YouTube references locally, preserving metadata and native 60 fps."""
import argparse
from pathlib import Path
import yt_dlp

p=argparse.ArgumentParser(description=__doc__)
p.add_argument("output",type=Path)
p.add_argument("urls",nargs="+")
a=p.parse_args()
a.output.mkdir(parents=True,exist_ok=True)
with yt_dlp.YoutubeDL({"format":"bv[height<=1080][fps>=60]+ba/bv[height<=1080]+ba/b[height<=1080]",
    "merge_output_format":"mp4","writeinfojson":True,"noplaylist":True,
    "outtmpl":str(a.output/"%(id)s.%(ext)s")}) as ydl:
    ydl.download(a.urls)
