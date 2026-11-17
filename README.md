# Paisa Decode Motion

A reusable Codex skill and editable 30-second Hindi business-explainer demo inspired by Paisa Decode's visual storytelling. The demo uses original procedural artwork, synthetic narration, and original locally synthesized music and sound effects.

![Demo preview](demo/output/preview.jpg)

**[Watch or download the 30-second MP4](demo/output/chai-demo-30s.mp4)** · [Download the portable skill](paisa-decode-motion-skill.zip)

## Included

- [Skill instructions](skill/SKILL.md), observed style notes, and an editable Remotion template.
- [Demo source](demo/src/ChaiFilm.tsx), narration, storyboard, generated audio, and finished MP4.
- [Reference evidence](skill/references/evidence.md) and [machine-readable coverage](analysis/coverage.json).
- Local download, 60 fps measurement, and consecutive-frame extraction tools under `skill/scripts/`.
- [Demo review notes](demo/review-notes.md), including checks performed and remaining limitations.

## Install the skill

From the repository root:

```sh
mkdir -p ~/.codex/skills
cp -R skill ~/.codex/skills/paisa-decode-motion
```

Invoke it as `$paisa-decode-motion` in Codex.

## Render the demo

Requirements: Node 20.19+, 22.13+, or 24+, FFmpeg, FFprobe, and `uv` for regenerating audio. The existing generated audio and paper texture are included.

```sh
cd demo
npm install
npm run render
```

To regenerate the Hindi voice and original music/SFX first:

```sh
uv run --with edge-tts python make_voice.py
uv run --with numpy --with pillow python make_audio.py
npm run stills
npm run render
```

The voice builder caches existing `public/vo-N.mp3` files. Remove the corresponding cached clip after changing its narration. Detailed dependencies and reuse instructions are in [build and reuse](skill/references/build.md).

## Reference study

Three native 60 fps videos were downloaded for local study. Across their full lengths, 129,684 frames were measured locally. Selected intervals containing 3,240 consecutive frames were visually inspected at 60 fps, plus 272 overview frames across the full videos. This is targeted visual frame analysis alongside full-video computational measurement; it is not a claim that every reference frame was individually interpreted.

Vertex AI was used for audio-only transcription. No reference images, contact sheets, or video files were sent to Vertex. The original downloaded reference videos and large local frame sheets are excluded from this repository; source URLs, hashes, counts, and exact reviewed intervals are preserved in the evidence files.

## Demo details

- 1920 × 1080, H.264/yuv420p, 60 fps, 1,800 frames, 30.000-second video timeline.
- Synthetic Hindi voice, original 100 BPM music and locally synthesized sound effects, stereo AAC.
- Illustrative arithmetic: 100 cups × ₹20 = ₹2,000; supplies ₹800; daily overhead ₹500; remainder ₹700 before owner labour, tax, and setup costs.
- Decoded frames, arithmetic, audio levels, and an audio-only transcript were checked. Continuous real-time playback and direct listening were not performed. AAC packet padding makes the container 30.016 seconds long.

This is an original motion study, not an official Paisa Decode project or an endorsement by the channel.
