
import os, dotenv, base64, requests, json, time
from pydub import AudioSegment
from pydub.playback import play

dotenv.load_dotenv()
VOICE_UUID   = "5fd8cad1"   # required
PROJECT_UUID = os.getenv("RESEMBLE_PROJECT_UUID") # optional

TTS_URL = "https://f.cluster.resemble.ai/synthesize"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type":  "application/json",
    "Accept-Encoding": "gzip",
}

def ssml_wrap(text: str, emotion: str | None = None) -> str:
    if not emotion:
        return f"<speak>{text}</speak>"
    # simple “happy” example; adjust to taste
    return f'<speak prompt="{emotion} style" exaggeration="0.9">{text}</speak>'

def synthesize(text: str, emotion: str | None = None,
               outfile: str = "output.mp3", sample_rate: int = 22050):
    if not os.getenv("RESEMBLE_API_KEY"):
        play(AudioSegment.from_mp3("audios/first.mp3"))
    elif text == "second.mp3":
        play(AudioSegment.from_mp3("audios/second.mp3"))
    elif text == "third.mp3":
        play(AudioSegment.from_mp3("audios/third.mp3"))
    else:
        pass
    
    API_KEY = os.getenv("RESEMBLE_API_KEY") 
    HEADERS = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type":  "application/json",
        "Accept-Encoding": "gzip",
    }

    body = {
        "voice_uuid":  VOICE_UUID,
        "data":        ssml_wrap(text, emotion),
        "output_format": "mp3",
        "sample_rate": sample_rate,
    }
    if PROJECT_UUID:
        body["project_uuid"] = PROJECT_UUID

    # ---- POST & decode --------------------------------------------------
    r = requests.post(TTS_URL, headers=HEADERS, json=body, timeout=30)
    try:
        payload = r.json()
    except json.JSONDecodeError:
        raise RuntimeError(f"{r.status_code} {r.reason}: {r.text[:200]}")

    if not r.ok or not payload.get("success", True):
        raise RuntimeError(f"{r.status_code} {r.reason}: {payload}")

    audio_bytes = base64.b64decode(payload["audio_content"])
    with open(outfile, "wb") as f:
        f.write(audio_bytes)
    
    return outfile

if __name__ == "__main__":
    try:
        path = synthesize(
            "Hello there, my name is Tatia. I'm about to tell you a story about agents",
            emotion="happy",
            outfile="first.mp3"         # delete or change to neutral if your voice has no styles
        )
        print("MP3 saved →", path)
        play(AudioSegment.from_mp3(path))
    except Exception as e:
        print("Error:", e)
