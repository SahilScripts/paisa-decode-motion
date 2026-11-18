# Use your own music

Replace the generated music bed with a supplied track. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Replace the generated music bed with my track at [LOCAL MUSIC PATH], using the passage starting at [TRACK START, e.g. 00:12]. Keep the narration and sound effects. Build an actual 30-second music layer with a smooth entrance and an intentional ending; duck it under speech and blend any necessary edit or loop.

Integrate the track into make_audio.py or an equally reproducible offline mixer, then rebuild mix.wav. Use local probing to confirm the file and its duration. If the supplied passage cannot fit, extend or edit the music rather than truncating speech. Render chai-my-music-v2.mp4.
```

Use the [session setup and edit defaults](README.md#start-a-session) once when starting a fresh agent session.
