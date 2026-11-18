# Replace sound effects

Use softer, more natural action sounds. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the current bright coin pings with softer metallic coin clicks. Make paper/card movement sound like a short dry paper slide, and make the ingredient-card contacts gentle wooden taps. Apply this to the existing coin, paper and wood event types in make_audio.py.

Keep the narration and music. Match each effect's perceived contact/attack to its visual event rather than just matching the start of an audio file. Locally synthesize suitable replacements or use supplied effects; if Vertex is used, use it only for sound effects or audio transcription. Rebuild mix.wav, check the balance, and render chai-sfx-v2.mp4.
```

Use the [session setup and edit defaults](README.md#start-a-session) once when starting a fresh agent session.

