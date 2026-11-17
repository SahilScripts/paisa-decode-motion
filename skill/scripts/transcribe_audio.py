"""Vertex AUDIO ONLY transcription. No image/video input is accepted or uploaded."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path


def transcribe(src, dst, config, key, start=0, seconds=45):
    from google import genai
    from google.genai import types
    from google.oauth2 import service_account
    settings = json.loads(Path(config).read_text())
    credentials = service_account.Credentials.from_service_account_file(str(key),
        scopes=["https://www.googleapis.com/auth/cloud-platform"])
    client = genai.Client(vertexai=True, project=settings["vertex_project"], location="global", credentials=credentials)
    with tempfile.TemporaryDirectory() as tmp:
        audio = Path(tmp)/"audio.mp3"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(start), "-i", str(src),
            "-t", str(seconds), "-vn", "-ac", "1", "-ar", "24000", "-b:a", "64k", str(audio)], check=True)
        response = client.models.generate_content(model="gemini-3.5-flash",
            contents=[types.Part.from_bytes(data=audio.read_bytes(), mime_type="audio/mp3"),
                "Transcribe the audio verbatim in its spoken Hindi/English. Return JSON with segments: "
                "[{start: seconds, end: seconds, text: string}], and audio_notes: a concise account of audible "
                "voice, music and sound effects. Describe only what can be heard. No visual inference."],
            config=types.GenerateContentConfig(response_mime_type="application/json", temperature=0.1))
    result = json.loads(response.text)
    if isinstance(result,list):
        result={"segments":result,"audio_notes":"Not returned by transcription model"}
    result.update(source=str(src), start=start, seconds=seconds, input_modality="audio only", model="gemini-3.5-flash")
    Path(dst).write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(str(dst), flush=True)


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("source", type=Path)
    p.add_argument("output", type=Path)
    p.add_argument("--config", type=Path, required=True)
    p.add_argument("--key", type=Path, required=True)
    p.add_argument("--start", type=float, default=0)
    p.add_argument("--seconds", type=float, default=45)
    a=p.parse_args()
    transcribe(a.source,a.output,a.config,a.key,a.start,a.seconds)
