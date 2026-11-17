"""Deterministic original music/SFX plus fitted synthetic VO. Outputs a real audio mix."""
import json
import subprocess
import wave
from pathlib import Path
import numpy as np
from PIL import Image

HERE=Path(__file__).resolve().parent
PUB=HERE/"public"
SR=48000
rng=np.random.default_rng(4116)
music=np.zeros(SR*30,dtype=np.float64)
sfx=music.copy()
voice=music.copy()

def add(track, sound, start):
    a=round(start*SR); b=min(len(track),a+len(sound))
    if b>a:track[a:b]+=sound[:b-a]

def tone(hz,dur=.4,amp=.05,decay=8):
    t=np.arange(round(SR*dur))/SR
    env=(1-np.exp(-t*180))*np.exp(-t*decay)
    return amp*env*(np.sin(2*np.pi*hz*t)+.28*np.sin(2*np.pi*hz*2*t)+.08*np.sin(2*np.pi*hz*3*t))

# A quiet 100 BPM marimba/bass phrase; harmony changes each four beats.
chords=[[164.8138,195.9977,246.9417],[130.8128,164.8138,195.9977],
        [146.8324,184.9972,220],[123.4708,146.8324,184.9972]]
for i in range(48):
    beat=i*.6
    chord=chords[(i//4)%4]
    if i%4==0:
        add(music,tone(chord[0]/2,1.5,.034,3),beat)
    add(music,tone(chord[[0,2,1,2][i%4]]*2,.38,.023,10),beat+.015)
    if i%2:
        n=rng.normal(0,1,round(SR*.05))
        add(music,n*np.exp(-np.arange(len(n))/SR*90)*.005,beat)
    if i%4==2:
        add(music,tone(chord[1]*2,.25,.016,14),beat+.3)

events=[(.68,'wood',.025),(1.15,'coin',.045),(5.15,'paper',.018),(6.95,'coin',.035),
        (9.55,'wood',.025),(10.35,'wood',.025),(11.15,'wood',.025),(11.95,'wood',.025),
        (13.05,'coin',.035),(14.8,'paper',.018),(16.5,'paper',.022),(20.35,'coin',.045),
        (24.9,'paper',.018),(26.1,'coin',.045)]
for when,kind,amp in events:
    if kind=='coin':
        x=tone(1396.913,.6,amp,10)+tone(2093.005,.6,amp*.35,14)
    elif kind=='wood':
        x=tone(390,.16,amp,30)+tone(140,.16,amp,35)
    else:
        t=np.arange(round(SR*.22))/SR
        noise=rng.normal(size=len(t))
        noise=np.convolve(noise,np.ones(9)/9,mode='same')
        x=noise*np.sin(np.pi*t/.22)**2*amp
    add(sfx,x,when)

timings=[]
for i,part in enumerate(json.loads((HERE/"narration.json").read_text())):
    trim="silenceremove=start_periods=1:start_duration=0.015:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_duration=0.015:start_threshold=-45dB,areverse"
    raw=subprocess.check_output(["ffmpeg","-v","error","-i",str(PUB/f"vo-{i}.mp3"),"-af",trim,
        "-ac","1","-ar",str(SR),"-f","f32le","-"])
    samples=np.frombuffer(raw,np.float32)
    duration=len(samples)/SR
    target=part['end']-part['start']
    speed=max(1,duration/target)
    if speed>1.28:raise RuntimeError(f"VO {i} needs {speed:.2f}x speed; shorten its script")
    args=["ffmpeg","-v","error","-f","f32le","-ar",str(SR),"-ac","1","-i","-",
        "-af",f"atempo={speed},loudnorm=I=-17:TP=-2:LRA=7","-ar",str(SR),"-f","f32le","-"]
    fitted=np.frombuffer(subprocess.check_output(args,input=samples.tobytes()),np.float32)
    add(voice,fitted,part['start'])
    timings.append({**part,"natural_trimmed_seconds":duration,"speed_factor":speed,
        "actual_end":part['start']+len(fitted)/SR})

# Gentle sidechain from the real VO envelope.
energy=np.convolve(voice**2,np.ones(2400)/2400,mode='same')**.5
duck=1-.42*np.clip(energy/.07,0,1)
music*=duck
tail=np.clip((30-np.arange(len(music))/SR)/.9,0,1)
music*=tail
sfx*=tail
mixed=voice+music+sfx
peak=np.max(np.abs(mixed))
if peak>.93:mixed*=.93/peak
stereo=np.stack([mixed,mixed],axis=1)
with wave.open(str(PUB/"mix.wav"),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((stereo*32767).astype('<i2').tobytes())
(HERE/"audio-timing.json").write_text(json.dumps({"voice":"Edge hi-IN-MadhurNeural, synthetic",
    "music":"original deterministic local synthesis, 100 BPM", "sfx":"original local synthesis", "parts":timings,
    "events":[{"time":x,"kind":y} for x,y,_ in events],"sample_peak_dbfs":float(20*np.log10(np.max(np.abs(mixed))))},ensure_ascii=False,indent=2))
noise=rng.integers(222,256,size=(1080,1920),dtype=np.uint8)
Image.fromarray(noise).save(PUB/"paper.png")
print(json.dumps(timings,ensure_ascii=False,indent=2))
