# Prompt library for users

This is your copy-and-paste prompt book. Keep it beside the skill when you download the project. The skill supplies the workflow and reusable resources. Your message supplies this video's task: what to change, where, and the result you want. A short, specific request is enough; the examples below provide more detail when useful. You do not have to write code yourself.

For Codex with this skill installed, you can start with `Use $paisa-decode-motion`. With another coding agent, ask it to read `skill/SKILL.md` and the relevant supporting files. Whether another application discovers or installs skills automatically depends on that application's support. Explicitly requesting a named skill is supported in [official OpenAI documentation](https://developers.openai.com/api/docs/guides/tools-skills).

## Start a session

1. Download or clone the public repository, or give the agent access to its working files. Keep this prompt book open for yourself and provide the skill/project to the agent.
2. Copy the setup below for the first request in a fresh session.
3. Choose a numbered section below, replace square-bracket fields where present, and paste its code-block text after that setup in the same message. Examples without square brackets can be used as written. Later edits can use just the numbered prompt.
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

Download this PROMPTS.md separately and keep it for yourself. The skill ZIP contains the agent instructions, tools and editable template; this user prompt book stays outside that package. The ZIP also excludes the generated demo voice/music files and finished MP4. Use this setup, followed by your chosen edit:

```text
Read the supplied paisa-decode-motion SKILL.md. Copy its assets/demo-template into a new working folder named my-motion-project and use that as the target project. Apply the edit request below to that folder; adapt its demo/ paths to the new target. Install the local rendering dependencies and generate the paper texture, voice and audio mix using the included build instructions and the revised script. Treat the supplied template's story as the starting point unless I provide a new topic. Render a new named MP4 and report the checks actually completed. Keep image analysis local and restrict Vertex to audio transcription or sound effects.
```

## Choose an edit

| # | Copy this prompt |
|---|---|
| 01 | [Change colours](#01-change-colours) |
| 02 | [Switch to a dark theme](#02-switch-to-a-dark-theme) |
| 03 | [Change fonts and typography](#03-change-fonts-and-typography) |
| 04 | [Change the paper background](#04-change-the-paper-background) |
| 05 | [Move or resize an object](#05-move-or-resize-an-object) |
| 06 | [Change a character or prop](#06-change-a-character-or-prop) |
| 07 | [Add your logo and branding](#07-add-your-logo-and-branding) |
| 08 | [Replace sound effects](#08-replace-sound-effects) |
| 09 | [Turn sound effects up or down](#09-turn-sound-effects-up-or-down) |
| 10 | [Move or remove a sound cue](#10-move-or-remove-a-sound-cue) |
| 11 | [Use your own music](#11-use-your-own-music) |
| 12 | [Change the mix or remove audio layers](#12-change-the-mix-or-remove-audio-layers) |
| 13 | [Change the synthetic narrator](#13-change-the-synthetic-narrator) |
| 14 | [Use your recorded voice](#14-use-your-recorded-voice) |
| 15 | [Change words or language](#15-change-words-or-language) |
| 16 | [Add subtitles](#16-add-subtitles) |
| 17 | [Change prices, quantities and costs](#17-change-prices-quantities-and-costs) |
| 18 | [Change motion and pacing](#18-change-motion-and-pacing) |
| 19 | [Rebuild just one scene](#19-rebuild-just-one-scene) |
| 20 | [Change the duration](#20-change-the-duration) |
| 21 | [Make a vertical or square version](#21-make-a-vertical-or-square-version) |
| 22 | [Change export quality or resolution](#22-change-export-quality-or-resolution) |
| 23 | [Create a new video](#23-create-a-new-video) |
| 24 | [Make several changes together](#24-make-several-changes-together) |
| 25 | [Fix a specific visual or audio problem](#25-fix-a-specific-visual-or-audio-problem) |
| 26 | [Save preferences for future videos](#26-save-preferences-for-future-videos) |

For several changes to the same cut, [24: Combined edit](#24-make-several-changes-together) is the shortest route. For another topic, use [23: New video](#23-create-a-new-video). Use [26: Save defaults](#26-save-preferences-for-future-videos) only when you want the approved choices to affect future projects.

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

## Copy-ready prompt texts

### 01 Change colours

Switch the accent from orange to blue. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Change the accent to blue #2563EB, its dark shade to #1E40AF, and the paper background to #F4F1E9. Keep the existing cost/pink and remainder/green meanings clear. Recolour the coin, price highlights, progress line, cart accents and other accent-coloured objects consistently, including their SVG gradients, rims, outlines and highlights. Keep clay, wood and metal recognisable.

Keep the current story, numbers, scene timings and audio. Inspect the larger scene frames for contrast and any leftover orange accent colours. Render a new version named chai-blue-v2.mp4.
```

### 02 Switch to a dark theme

Use a charcoal and orange treatment. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Create a dark version: background #171512, primary text #FFF8EE, accent #FF861A, and dark cards #29241F. Adapt paper grain, background dots, card shadows, labels, icons and SVG outlines so they work on the dark background. Keep expenses visibly distinct from the remainder.

Keep the current narrative, arithmetic, duration and audio. Check every scene for dark-on-dark text and bright highlights that overpower the numbers. Render chai-dark-v2.mp4.
```

### 03 Change fonts and typography

Use a different typeface and readable text sizing. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the headline font with [FONT NAME OR LOCAL FONT FILE] and use [BODY FONT] for supporting labels. Apply the change to HTML text and SVG text, including amounts, price labels and the cart sign. Use bold headlines with slightly looser spacing than the current demo, and make the small explanatory labels about 15% larger.

Load the font deterministically from a usable local asset when available. Check rupee and Hindi glyphs, word masks, line breaks and card fit after the font loads. Keep the existing timing and audio. Render chai-typography-v2.mp4.
```

### 04 Change the paper background

Make the background cleaner without changing the artwork. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Make the background a cleaner warm ivory #FAF7EF. Remove the visible dotted grid, reduce the paper grain to a very subtle level, and soften the orange background stains. Keep the background texture stationary and the text contrast clear.

Apply this to all six scenes while keeping the current characters, cards, narrative, timing and audio. Check both ChaiFilm.tsx background layers and public/paper.png; rebuilding the audio generator must not accidentally restore the old look. Render chai-clean-paper-v2.mp4.
```

### 05 Move or resize an object

Fix a local layout without changing the whole film. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

In the sales scene at 5.0–9.3 seconds, make the ₹2,000 receipt 10% smaller and move it slightly upward. Move the coin beside it so the receipt caption remains fully readable. Keep all 100 cups visible and give the footer clear space.

Adjust the relevant scene positions, dimensions and motion anchors together. Keep the other scenes, numbers and audio as they are. Check entry, overshoot, settled position and exit, then render chai-layout-v2.mp4.
```

### 06 Change a character or prop

Replace the coin character with another original design. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the round coin mascot with an original rounded savings-jar character. Give it a readable face, a warm material finish, a rim/highlight and a contact shadow. It should look curious in the opening and pleased when the ₹700 remainder appears. Keep each monetary label attached to the correct character.

Update its silhouette, expression changes, size and entry motion wherever it appears. Preserve the story, arithmetic, duration and audio. Build the artwork locally in code and inspect all reused poses. Render chai-new-character-v2.mp4.
```

### 07 Add your logo and branding

Replace demo branding with your own brand. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Brand this video for [BRAND NAME]. Use my logo at [LOCAL LOGO PATH] and this handle: [HANDLE]. Replace the top study label with the brand name and put the logo/handle in a quiet, consistent position that clears all scene content. Keep the illustrative-numbers and excluded-cost disclosures readable.

Use the supplied brand assets and adapt spacing for their actual dimensions. Keep the story, arithmetic, timing and audio. If the logo file cannot be accessed, request it before rendering a branded final. Render chai-branded-v2.mp4.
```

### 08 Replace sound effects

Use softer, more natural action sounds. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the current bright coin pings with softer metallic coin clicks. Make paper/card movement sound like a short dry paper slide, and make the ingredient-card contacts gentle wooden taps. Apply this to the existing coin, paper and wood event types in make_audio.py.

Keep the narration and music. Match each effect's perceived contact/attack to its visual event rather than just matching the start of an audio file. Locally synthesize suitable replacements or use supplied effects; if Vertex is used, use it only for sound effects or audio transcription. Rebuild mix.wav, check the balance, and render chai-sfx-v2.mp4.
```

### 09 Turn sound effects up or down

Lower effects without lowering the voice. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Reduce only the sound-effects layer by 8 dB. Keep the voice and music gains as they are. Change the sfx array/gain before it is combined with voice and music in make_audio.py, and account for any final peak normalization when checking the result.

Rebuild public/mix.wav and compare the new effect levels with the baseline. Check the exported mix for clipping and speech clarity. Keep all visuals and timings, then render chai-quieter-sfx-v2.mp4.
```

### 10 Move or remove a sound cue

Fix a specific click or whoosh. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Move the coin cue currently scheduled at 6.95 seconds to the actual frame where the sales total reaches ₹2,000. Remove the paper cue at 14.8 seconds. Keep the remaining sound events, narration, music and visuals.

Inspect the consecutive local frames around the count settling and allow for the sound's internal attack when setting the cue time. Rebuild mix.wav, check the changed moments with neighbouring frames, and render chai-cues-v2.mp4. Report the old and new cue times.
```

### 11 Use your own music

Replace the generated music bed with a supplied track. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the generated music bed with my track at [LOCAL MUSIC PATH], using the passage starting at [TRACK START, e.g. 00:12]. Keep the narration and sound effects. Build an actual 30-second music layer with a smooth entrance and an intentional ending; duck it under speech and blend any necessary edit or loop.

Integrate the track into make_audio.py or an equally reproducible offline mixer, then rebuild mix.wav. Use local probing to confirm the file and its duration. If the supplied passage cannot fit, extend or edit the music rather than truncating speech. Render chai-my-music-v2.mp4.
```

### 12 Change the mix or remove audio layers

Keep narration forward and reduce the music. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Lower only the music bed by 6 dB, keep narration at its current level, and keep the sound effects. Preserve the music's existing speech ducking. Apply the change to the music layer before combining it into mix.wav rather than lowering the final mixed track.

Rebuild and measure the mix, check the opening, loudest effect and ending, and render chai-voice-forward-v2.mp4. If listening is unavailable, report the measured checks separately from listening.

If I instead specify 'narration only', set both music and SFX layers to silence while retaining the voice. If I specify 'fully silent', export with no audio stream.
```

### 13 Change the synthetic narrator

Use another voice or delivery style. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Use the standard synthetic voice [VOICE ID OR NAME] from [PROVIDER], with a warm, conversational Hindi delivery and slightly slower pacing. Keep the current words and intended 30-second timeline. Use an available standard voice rather than imitating the reference narrator.

Update the selected provider/voice in make_voice.py. Explicitly regenerate all six cached vo-N.mp3 clips, measure their trimmed lengths, rebuild mix.wav and retime scene actions where the spoken cues move. If the slower delivery cannot naturally fit 30 seconds, show the smallest wording or timing tradeoff needed. Keep Vertex limited to transcription or SFX. Render chai-new-voice-v2.mp4.
```

### 14 Use your recorded voice

Replace synthetic speech with a supplied recording. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Use my narration file at [LOCAL RECORDING PATH]. Keep its spoken wording and natural delivery. Check its transcript and timing, align the visual amounts and actions to the actual speech, and retain the music and SFX at a supportive level.

Use the recording as the voice source in the reproducible mix. Update the narration timing data and scene constants together, including the closing hold. If the recording cannot fit the intended duration naturally, tell me its measured length and the practical tradeoff instead of cutting words. Vertex may transcribe extracted audio only. Render chai-my-voice-v2.mp4.
```

### 15 Change words or language

Rewrite narration and visible copy together. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Change the narration and on-screen wording to [LANGUAGE AND TONE, e.g. simple conversational English]. Use this replacement script:
[PASTE THE COMPLETE SCRIPT]

Preserve the meaning of the price, sales, cost breakdown and ₹700 remainder unless the supplied script explicitly changes the figures. Update narration.json, visible HTML/SVG copy and storyboard. Regenerate every changed cached voice clip, rebuild mix.wav and retime reveals using the actual narration. Fit the target duration through clear phrasing and scene timing. Check glyphs, card fit and the final spoken phrase. Render chai-new-script-v2.mp4.
```

### 16 Add subtitles

Add readable captions tied to the actual narration. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Add Hindi subtitles in short readable phrases, aligned to the actual exported narration. Place them in a dedicated lower safe area, at most two lines, with enough contrast and a maximum width that works at phone viewing size. Reposition the footer or artwork where needed so both remain legible.

Build caption timing from the real audio rather than dividing the script into equal durations. Use local analysis or audio-only transcription; refine coarse timings against the audio. Export both a subtitled MP4 and an SRT file. Keep the existing music, effects and business arithmetic. Report if subtitle synchronization could only be measured rather than listened to.
```

### 17 Change prices, quantities and costs

Recalculate every connected number. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Use this new illustrative example: 120 cups per day, ₹25 per cup; per-cup costs ₹6 milk, ₹1 tea, ₹1 sugar and ₹2 cup; daily overhead ₹300 rent, ₹200 gas/power and ₹100 other. Recalculate the revenue, per-cup inputs, daily input total, pre-overhead remainder and final displayed remainder. Keep owner labour, tax and setup costs explicitly excluded.

Update narration.json, all visible amounts and equations, the cup count or clearly labelled repeated-unit scale, cost bar proportions, counter targets, coin labels, storyboard and relevant timing data. Regenerate affected speech, rebuild the mix and render chai-new-numbers-v2.mp4. Include the checked calculation with the result.
```

### 18 Change motion and pacing

Make the movement calmer while keeping the runtime. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Make the motion about 30% calmer while keeping the same 30-second duration and narration. Reduce bounce/overshoot, camera drift and entry travel, soften blur accents, and give settled numbers a clear readable hold. Keep the cup build and cost subtraction visibly explanatory.

Adjust pop/ease use, scene transforms and specific object moves rather than slowing down the encoded MP4. Align sound cues to any changed contact frames and rebuild the mix if those cues move. Inspect consecutive frames around every changed entry and transition. Render chai-calm-motion-v2.mp4.
```

### 19 Rebuild just one scene

Change the ingredient scene's explanatory device. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Rebuild only the ingredient-cost scene at 9.3–14.7 seconds. Instead of four floating cards, show milk, tea leaves, sugar and the cup assembling into one cup, with each ₹5/₹1/₹1/₹1 cost attaching as it arrives. Finish on ₹8 per cup and ₹800 for 100 cups.

Keep the current narration, arithmetic and total duration. Design the new scene in the existing cream/orange treatment, retime its supporting effects, and check both neighbouring transitions. Keep the rest of the film's behaviour. Render a short preview of the rebuilt section, then a new full version named chai-ingredient-scene-v2.mp4.
```

### 20 Change the duration

Expand the demo into a 45-second explainer. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Make a 45-second version of this story with more breathing room for the cost calculation and the owner-labour caveat. Expand the spoken explanation and scene design where useful; keep the original illustrative arithmetic.

Update the composition duration, narration intervals, scene starts/ends and motion cues, soundtrack allocation, music beat loop, fades, progress indicator and render-still sample times. Find the hard-coded 30/1800 values and change their meaning where appropriate. Generate a real 45-second mix, measure narration fit, and verify 2,700 frames at 60 fps. Render chai-45s-v2.mp4.
```

### 21 Make a vertical or square version

Recompose for a 1080 × 1920 phone frame. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Make a 1080 × 1920 vertical version for phone viewing, keeping 60 fps and the 30-second story. Recompose each scene: use stacked headline/object layouts, legible labels, a repeated-cup arrangement that fits, and an appropriately arranged cost bar or cost stack. Keep all required numbers and the labour/tax/setup caveat visible.

Update the composition, absolute positions, widths, typography, background/texture sizing, footer and caption-safe space. Inspect object paths and overshoots in the new frame. Use the existing audio timing where it still fits. Render chai-vertical-1080x1920-v2.mp4. If I specify square instead, use 1080 × 1080 and recompose for that canvas.
```

### 22 Change export quality or resolution

Create a higher-resolution version. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Export a 3840 × 2160 version at 60 fps with H.264/yuv420p and AAC audio. Preserve the 30-second timeline, framing and readable layout. Use scalable rendering or proportionate scene scaling so the existing 1920 × 1080 coordinates do not shrink the artwork into a corner. Recreate the paper texture at an appropriate resolution if needed.

Keep the current story and mix. Verify the actual encoded resolution, frame rate, frame count, codec, pixel format and audio. Save chai-4k-v2.mp4 and report its file size. Treat this as a render-quality change, not a new creative edit.
```

### 23 Create a new video

Use the skill for another business. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and create a new project at projects/[PROJECT NAME]/ using the included demo template as a starting point.

Topic: [BUSINESS OR QUESTION]. Audience/language: [AUDIENCE AND LANGUAGE]. Duration: [SECONDS]. Format: [WIDTH × HEIGHT], 60 fps. Visual treatment: [CREAM/ORANGE CHARACTERS, BLACK/ORANGE GRAPHICS, OR CREAM/BLUE SPATIAL]. Numbers and sources or illustrative assumptions: [PASTE DETAILS]. Narrator and supplied audio assets: [DETAILS OR 'USE AVAILABLE STANDARD SYNTHETIC VOICE'].

Build an original hook, scene plan, artwork, narration, soundtrack and visible price × volume − costs explanation for this business. Replace the chai-specific objects, copy, arithmetic and timing throughout. Validate linked figures and distinguish verified claims from illustrative assumptions. Keep reference image analysis local and limit Vertex to transcription or SFX. Render the final MP4 and save editable sources and review notes in the new project.
```

### 24 Make several changes together

Use one complete brief for a coordinated revision. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Create a new version with these changes:
- Palette: [COLOURS OR 'CURRENT'].
- Branding: [NAME, HANDLE AND LOGO PATH OR 'CURRENT'].
- Text/script: [REPLACEMENT OR 'CURRENT'].
- Voice: [VOICE/RECORDING DETAILS OR 'CURRENT'].
- Music: [TRACK/STYLE/GAIN OR 'CURRENT'].
- Sound effects: [REPLACEMENTS, GAIN AND CUE CHANGES OR 'CURRENT'].
- Motion/layout: [REQUEST OR 'CURRENT'].
- Duration, aspect ratio and resolution: [SETTINGS OR 'CURRENT'].
- Output filename: [NEW NAME].mp4.

Resolve dependencies between these edits: new words need new speech and reveal timings; a new aspect ratio needs scene recomposition; audio changes need a rebuilt mix. Apply the supplied brief, check the affected scenes and final encoded file, and provide the new MP4 plus a concise change report. Carry the request through the render.
```

### 25 Fix a specific visual or audio problem

Use a timestamp and a visible symptom. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

At [TIME OR TIME RANGE], this happens: [DESCRIBE THE VISIBLE/AUDIBLE PROBLEM]. The intended result is: [WHAT SHOULD HAPPEN]. If useful, inspect this supplied screenshot or clip locally: [LOCAL PATH OR 'NONE'].

Inspect the source and consecutive frames around the affected moment, including the preceding and following scene. Find and fix the cause in layout, timing, asset handling or the audio generator as appropriate. Rebuild only the dependent assets, render a new full version and check the repaired interval again. Keep a short record of the cause, correction and actual verification. Save chai-fix-v2.mp4.
```

### 26 Save preferences for future videos

Update the reusable skill after approving a look. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and the approved project version at [PROJECT PATH OR COMMIT]. Make the following my defaults for future videos: [LIST THE APPROVED PALETTE, TYPOGRAPHY, VOICE, MUSIC/SFX AND MOTION PREFERENCES].

Record these preferences clearly in the skill's appropriate references and update the portable demo template where the settings are implemented. Keep per-video numbers, story and assets specific to their project. Explicit requests for another look should still override these defaults.

Regenerate the portable skill ZIP, validate its internal links and instructions, and report which defaults changed. If this machine also has a separate installed copy of the skill, update that copy or explain which path needs reinstalling. Save these as future defaults; do not describe a documentation-only change as a newly rendered video.
```
