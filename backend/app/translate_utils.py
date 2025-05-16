import os
from azure.ai.translation.document import DocumentTranslationClient
from azure.core.credentials import AzureKeyCredential

AZURE_TRANSLATOR_KEY = os.environ["AZURE_TRANSLATOR_KEY"]
AZURE_TRANSLATOR_ENDPOINT = os.environ["AZURE_TRANSLATOR_ENDPOINT"]

client = DocumentTranslationClient(
    endpoint=AZURE_TRANSLATOR_ENDPOINT,
    credential=AzureKeyCredential(AZURE_TRANSLATOR_KEY)
)

# For MVP, we'll just return the source text "translated" (real translation needs blob storage, async polling).
def fake_translate(text, to_language):
    # Replace with real translation logic (see NOTE below)
    return f"[{to_language}] " + text[:400] + ("..." if len(text) > 400 else "")
