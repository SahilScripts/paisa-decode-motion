# Build and reuse

The included `assets/demo-template` contains the exact editable code used for the delivered
30-second study. Its art is original SVG; speech is a standard synthetic Hindi voice;
music and SFX are deterministic local synthesis. It contains no downloaded channel footage,
channel logo, copied soundtrack, voice clone, or embedded credential.

Copy the template into a new output folder. From that folder:

```sh
npm install
uv run --with edge-tts python make_voice.py
uv run --with numpy --with pillow python make_audio.py
npm run stills
npm run render
```

FFmpeg and FFprobe must be installed and on PATH. Node 20.19+, 22.13+, or 24+ is appropriate
for the pinned Remotion version. The original workspace demo reuses an existing node_modules
via a symlink; the portable template deliberately excludes that machine-specific link.
Remotion may download its browser on a fresh machine. The demo uses locally installed Arial
and Arial Black; choose an available equivalent or licensed font if rendering elsewhere.

Change narration.json before generating speech. If a voice line changes, remove/regenerate
that line's `public/vo-N.mp3`; existing clips are intentionally cached. Then rebuild mix.wav.
The audio builder trims edge silence, measures each clip, and only speeds it up if needed
to fit its allotted interval; it rejects factors over 1.28. The delivered mix needed no
additional time compression. Actual fitted ends are written to audio-timing.json.

The scene starts and semantic actions in src/ChaiFilm.tsx must be retimed when the narration
changes. Shared timing data should replace these constants for substantially different
scripts. The example demonstrates one implementation, not an automatic voice-driven editor.

Render from index.tsx using render.mjs. The composition is 1,800 frames, 60 fps, 1920×1080.
make_audio.py writes the real 30-second mix, paper.png and cue timings; a realtime preview
alone would not provide an exported audio track. render.mjs bundles only this small public
directory and removes its temporary bundle after completion.

## Local analysis dependencies

`analyze_local.py` and `dense_window.py` require NumPy, Pillow, OpenCV and local FFmpeg.
`download_sources.py` requires yt-dlp. `transcribe_audio.py` additionally requires
google-genai and google-auth plus the user's existing Vertex project/key configuration.
Pass configuration paths at runtime; never copy secrets into the skill.

Use `dense_window.py VIDEO OUT --start 176 --seconds 4` to inspect a newly selected interval
without rerunning an entire video's measurements. It emits each successive 60 Hz frame,
60 per sheet, and a coverage manifest. Source-native rates remain recorded by the full
analyzer. Native 60 Hz sources were available for all three studied videos.

## Verification

```sh
ffprobe -v error -count_frames -show_streams -show_format -of json output/chai-demo-30s.mp4
```

Check H.264/yuv420p, 1920×1080, 60/1 average and nominal rates, 1,800 decoded frames,
30.000 seconds of video, and stereo AAC. AAC packet padding can make the container a few
milliseconds longer than the exact video timeline; record both rather than hiding this.

Review the decoded export with the local frame tools, including starts, fast entries,
mathematical changes, transitions, footer clearance and the last second. Use the audio
probe and audio-only transcript as additional checks. Neither establishes that an agent
listened to the mix or watched real-time playback; leave those checks open when unavailable.
