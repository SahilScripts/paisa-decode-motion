---
name: paisa-decode-motion
description: Create Hindi or Hinglish business explainer motion graphics inspired by Paisa Decode, with expressive money objects, kinetic text, and visible unit-economics arithmetic. Use for this channel-inspired look or similar narrated business breakdowns; not for generic video editing.
---

# Paisa Decode motion

Build an original explainer whose objects perform the calculation. Prefer the cream/orange
character-led treatment of the supplied coaching reference unless the brief selects another
look. The channel also has black/orange 2D and cream/blue spatial treatments: they are distinct
options, not ingredients to mix indiscriminately.

Read [the observed style](references/style.md) before designing and
[the analysis evidence](references/evidence.md) when matching a particular move or claiming
reference coverage. Observed parameters are starting points, not recovered project settings.
For rendering commands and dependencies, read [build and reuse](references/build.md).

## Frame analysis boundary

- Download reference material locally. Preserve source URL, video ID, native fps, duration,
  and source hash. `scripts/download_sources.py` handles explicit YouTube video URLs.
- Use `scripts/analyze_local.py VIDEO OUT --start 0 --start 120 --seconds 3` to measure every
  frame on a 60 Hz grid and generate timestamped consecutive-frame sheets plus overviews.
  At 60 fps one frame is 16.667 ms. Resampling 24/30 fps does not create observed new motion.
- Inspect images directly with the agent's local image viewer. For small text or subtle
  easing, extract the relevant full-resolution consecutive frames. Do not infer exact
  animation curves from a still or thumbnail sheet.
  `scripts/dense_window.py VIDEO OUT --start 176 --seconds 4` adds a dense interval without
  remeasuring the whole video.
- Vertex AI is allowed only for transcription or sound effects. Never send reference video,
  screenshots, frames, contact sheets, image bytes, or image URLs to Vertex or another vision
  service. `scripts/transcribe_audio.py` extracts and uploads audio only.
- Keep separate records for frames measured, sheets generated, images visually inspected,
  and playback/audio checked. Automated metrics and generated sheets are not visual review.
  Record the exact dense intervals actually inspected; do not claim a whole-video visual
  frame audit unless it happened.

## Story and numbers

1. Establish a concrete unit and a tempting headline: a cup, jar, order, seat or student.
2. Put the headline amount on that object. Ask the take-home question before answering it.
3. Show price × volume = revenue; then physically divide that same revenue into costs and
   remainder. Preserve amount, scale and meaning across the transitions.
4. Separate per-unit inputs, daily/monthly fixed costs, owner labour, tax and assumptions.
   Never label contribution margin as final profit. Use sourced figures for factual claims;
   an invented example stays visibly labelled throughout the calculation.
5. End with the question or mechanism the viewer can use. A short demo does not need the
   long videos' growth-plan promise, locked future chapter, subscriber CTA, or channel logo.

## Direction and build

- Design the readable end state first. For each scene consider a few different mechanisms
  (token splitting, receipt, cost slots, balance, repeated units), choose the clearest, and
  record object action, text, camera/reframe, transition carrier and sound cue.
- Use narration to set meaning and timing. Use original speech or a permitted synthetic
  narrator; never clone the reference speaker. Bind number reveals and object contact to
  actual audio timings. Generate music and sparse action sounds with the first cut.
- Original SVG/CSS/canvas/Remotion is suitable for the cream treatment. Use a genuine 3D
  scene when the chosen blue spatial treatment depends on perspective and occlusion.
- Keep texture stationary in scene space, all random elements seeded, and motion a pure
  function of time so cold seeks and backward seeks reproduce the same image.
- Copy the included `assets/demo-template` into a new project as a working reference when
  useful. Replace its script, arithmetic, scene devices and narration for each new brief.
  Render locally; do not edit an unrelated film's entry point or public asset directory.

## Finish

Render a first internal cut, inspect every scene and boundary as consecutive frames, then
fix material problems and check the decoded final MP4. Confirm actual dimensions, 60 fps,
duration, expected frame count, yuv420p/H.264 and audible AAC. For 30 seconds expect 1,800
frames, with final frame at 29.9833 seconds. Check that the last spoken phrase fits and the
music ends intentionally. State explicitly if playback or listening was unavailable.

Deliver the MP4, editable project, assumptions, evidence/coverage record and review notes.
Keep source-channel assets out of the original demo and preserve source references in the
analysis folder rather than packaging downloaded videos into the skill.
