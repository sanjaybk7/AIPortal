import whisper
import tempfile

model = whisper.load_model("base")  # Or "small", "medium", "large"

def transcribe_audio_file(audio_bytes, filename):
    with tempfile.NamedTemporaryFile(suffix=filename) as tmp:
        tmp.write(audio_bytes)
        tmp.flush()
        result = model.transcribe(tmp.name)
    return result['text']
