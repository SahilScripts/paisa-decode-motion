# Copy-and-paste edit prompts

The skill supplies the workflow and reusable resources. Your message supplies this video's task: what to change, where, and the result you want. A short, specific request is enough; the examples below provide more detail when useful. You do not have to write code yourself.

For Codex with this skill installed, you can start with `Use $paisa-decode-motion`. With another coding agent, ask it to read `skill/SKILL.md` and the relevant supporting files. Whether another application discovers or installs skills automatically depends on that application's support. Explicitly requesting a named skill is supported in [official OpenAI documentation](https://developers.openai.com/api/docs/guides/tools-skills).

## Start a session

1. Give the agent access to this repository and open its working folder. It is a private GitHub repo, so a pasted URL alone may not give a different agent access. A local checkout or an uploaded project folder is sufficient.
2. Copy the setup below for the first request in a fresh session.
3. Open one or more numbered files below, replace square-bracket fields where present, and paste the text inside the code block after that setup in the same message. Examples without square brackets can be used as written. Later edits can use just the numbered prompt.
4. Ask follow-up edits in ordinary language, such as “Make that blue a little darker.” Use a new setup if the agent has lost the project context.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow for this repository.

Target project: demo/. Read its scene code, narration, audio generator and render entry point before editing. This task is to edit and render the video.

For each edit:
- Implement the requested changes in the editable source and rebuild the assets that depend on them.
- Keep the current video, narrative, numbers, timing, audio and format except where my requested change or its dependencies require an update. Make routine implementation decisions yourself.
- Save a clearly named new MP4 version and keep the existing baseline file available. The current render.mjs has a fixed output filename; choose a new output path or preserve the baseline before running it.
- Keep reference image/frame inspection local. Vertex AI may be used only for audio transcription or sound effects.
- For an audio edit, rebuild public/mix.wav and verify the exported video actually uses the revised mix.
- Check the changed scenes and adjacent transitions in the decoded output. Check text/number readability, object cropping, audio clipping, duration and actual encoded format. State which checks were measured, visually inspected, played or listened to.
- Provide the new MP4 path and a short account of the changes and remaining issues.

Apply the edit request that follows to this project.
```

These examples target the supplied `demo/` project. For your own film, replace that project path with its actual working folder. The phrase “current” means that project's current version.

### If you only have the skill ZIP

A skill package includes instructions and an editable template, but it does not include the generated demo voice/music files or finished MP4. Use this setup instead, then paste your chosen edit:

```text
Read the supplied paisa-decode-motion SKILL.md. Copy its assets/demo-template into a new working folder named my-motion-project and use that as the target project. Apply the edit request below to that folder; adapt its demo/ paths to the new target. Install the local rendering dependencies and generate the paper texture, voice and audio mix using the included build instructions and the revised script. Treat the supplied template's story as the starting point unless I provide a new topic. Render a new named MP4 and report the checks actually completed. Keep image analysis local and restrict Vertex to audio transcription or sound effects.
```

## Choose an edit

| # | Copy this prompt |
|---|---|
| 01 | [Change colours](01-colors.md) |
| 02 | [Switch to a dark theme](02-dark-theme.md) |
| 03 | [Change fonts and typography](03-fonts.md) |
| 04 | [Change the paper background](04-background.md) |
| 05 | [Move or resize an object](05-layout.md) |
| 06 | [Change a character or prop](06-characters.md) |
| 07 | [Add your logo and branding](07-branding.md) |
| 08 | [Replace sound effects](08-replace-sfx.md) |
| 09 | [Turn sound effects up or down](09-sfx-volume.md) |
| 10 | [Move or remove a sound cue](10-sfx-timing.md) |
| 11 | [Use your own music](11-replace-music.md) |
| 12 | [Change the mix or remove audio layers](12-audio-balance.md) |
| 13 | [Change the synthetic narrator](13-synthetic-voice.md) |
| 14 | [Use your recorded voice](14-my-recording.md) |
| 15 | [Change words or language](15-script-language.md) |
| 16 | [Add subtitles](16-subtitles.md) |
| 17 | [Change prices, quantities and costs](17-change-numbers.md) |
| 18 | [Change motion and pacing](18-motion-pacing.md) |
| 19 | [Rebuild just one scene](19-one-scene.md) |
| 20 | [Change the duration](20-duration.md) |
| 21 | [Make a vertical or square version](21-vertical-format.md) |
| 22 | [Change export quality or resolution](22-export.md) |
| 23 | [Create a new video](23-new-topic.md) |
| 24 | [Make several changes together](24-combined-edit.md) |
| 25 | [Fix a specific visual or audio problem](25-fix-a-problem.md) |
| 26 | [Save preferences for future videos](26-save-defaults.md) |

For several changes to the same cut, [24: Combined edit](24-combined-edit.md) is the shortest route. For another topic, use [23: New video](23-new-topic.md). Use [26: Save defaults](26-save-defaults.md) only when you want the approved choices to affect future projects.

## A few requests you can paste directly

```text
Read skill/SKILL.md and edit demo/. Change the orange accent to blue #2563EB, including the coin gradients and highlighted words. Keep the existing narration and timing. Check all scenes and render a new MP4 named chai-blue-v2.mp4.
```

```text
Read skill/SKILL.md and edit demo/. Make the coin pings softer and reduce the SFX layer by 8 dB. Keep the current narration and music. Rebuild the audio mix, verify the exported audio and render chai-soft-sfx-v2.mp4.
```

## Where the agent makes changes

These are the current source locations, not a settings dashboard. The agent edits code and rebuilds the affected assets.

| Change | Current location | Dependency to handle |
|---|---|---|
| Palette, text, font, objects, scene layout and motion | `demo/src/ChaiFilm.tsx` | `C` palette plus literal SVG colours/gradients and layout values; a palette-only edit does not recolour every object. |
| Spoken script and allocated voice intervals | `demo/narration.json` | Visible copy is separate in the TSX; script and on-screen text must be kept consistent. |
| Synthetic voice, provider and delivery rate | `demo/make_voice.py` | Existing `public/vo-N.mp3` clips are cached; changed clips must be explicitly regenerated. |
| Music, SFX, per-layer gains and cue times | `demo/make_audio.py` | The separate voice/music/SFX arrays are combined into `public/mix.wav`; no external music/SFX settings file exists yet. |
| Supplied recordings or music | Local media files integrated by the agent | A path in a prompt is a brief, not an implemented import option; the mixer may need adapting. |
| Scene and sound timing | TSX scene constants, narration JSON and Python event list | These are manually coordinated; `audio-timing.json` is an output report, not an automatic editor. |
| Duration, FPS and composition size | `demo/index.tsx` | The timeline, audio sample allocation, beat loop, scene bounds, texture dimensions and progress line also contain fixed values. |
| Output filename and render quality | `demo/render.mjs` | The current filename is fixed; a new version needs an explicit output-path change or baseline preservation. |
| Future reusable preferences | `skill/references/` and `skill/assets/demo-template/` | Ordinary edits to `demo/` do not automatically update the template, ZIP or separately installed skill. |

## One-video edits and future defaults

Changing a video's colours is an edit to that video. It does not automatically establish a rule for every future film. Use the save-defaults prompt when that is your intention. Its instructions include updating the reusable template, packaging the ZIP, and dealing with any separately installed copy.

These prompts describe tasks for a coding agent; they are not new one-click controls or claims that every variation has been rendered and tested. The existing demo remains the baseline. Prompts with media, font, voice or script placeholders need your actual inputs.

## What to include in a useful request

Give the agent a target (whole film, scene or timestamp), the desired result (a hex colour, sound character, replacement wording or example), any supplied file path, and the output you want. Plain language is fine: “At 13 seconds, that ping is too sharp; make it a quiet coin click” gives the agent enough direction to investigate.
