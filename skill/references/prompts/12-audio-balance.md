# Change the mix or remove audio layers

Keep narration forward and reduce the music. Replace any square-bracket placeholders before pasting.

```text
Read skill/SKILL.md and use the paisa-decode-motion workflow to edit demo/.

Lower only the music bed by 6 dB, keep narration at its current level, and keep the sound effects. Preserve the music's existing speech ducking. Apply the change to the music layer before combining it into mix.wav rather than lowering the final mixed track.

Rebuild and measure the mix, check the opening, loudest effect and ending, and render chai-voice-forward-v2.mp4. If listening is unavailable, report the measured checks separately from listening.

If I instead specify 'narration only', set both music and SFX layers to silence while retaining the voice. If I specify 'fully silent', export with no audio stream.
```

Use the [session setup and edit defaults](README.md#start-a-session) once when starting a fresh agent session.
