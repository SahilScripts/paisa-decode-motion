# Turn sound effects up or down

Lower effects without lowering the voice. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Reduce only the sound-effects layer by 8 dB. Keep the voice and music gains as they are. Change the sfx array/gain before it is combined with voice and music in make_audio.py, and account for any final peak normalization when checking the result.

Rebuild public/mix.wav and compare the new effect levels with the baseline. Check the exported mix for clipping and speech clarity. Keep all visuals and timings, then render chai-quieter-sfx-v2.mp4.
```

Use the [session setup and edit defaults](README.md#start-a-session) once when starting a fresh agent session.
