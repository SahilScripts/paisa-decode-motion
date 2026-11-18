# Change the synthetic narrator

Use another voice or delivery style. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Use the standard synthetic voice [VOICE ID OR NAME] from [PROVIDER], with a warm, conversational Hindi delivery and slightly slower pacing. Keep the current words and intended 30-second timeline. Use an available standard voice rather than imitating the reference narrator.

Update the selected provider/voice in make_voice.py. Explicitly regenerate all six cached vo-N.mp3 clips, measure their trimmed lengths, rebuild mix.wav and retime scene actions where the spoken cues move. If the slower delivery cannot naturally fit 30 seconds, show the smallest wording or timing tradeoff needed. Keep Vertex limited to transcription or SFX. Render chai-new-voice-v2.mp4.
```

Use the [session setup and edit defaults](README.md#start-a-session) once when starting a fresh agent session.

