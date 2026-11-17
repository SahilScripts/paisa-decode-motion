"""Generate original Hindi synthetic speech using Edge TTS; no voice cloning.

Run: uv run --with edge-tts python make_voice.py
"""
import asyncio
import json
from pathlib import Path
import edge_tts

HERE=Path(__file__).resolve().parent
(HERE/"public").mkdir(exist_ok=True)
async def main():
    for i, part in enumerate(json.loads((HERE/"narration.json").read_text())):
        dst=HERE/"public"/f"vo-{i}.mp3"
        if dst.exists() and dst.stat().st_size>500:
            continue
        await edge_tts.Communicate(part["text"],"hi-IN-MadhurNeural",rate="+8%").save(str(dst))
        print(dst.name,flush=True)

if __name__ == "__main__":
    asyncio.run(main())
