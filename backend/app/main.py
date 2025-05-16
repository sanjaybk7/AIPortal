from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.pinecone_utils import upsert_document, query_pinecone
from app.openai_utils import get_answer
from app.summarize_utils import summarize_text
from app.transcribe_utils import transcribe_audio_file
from app.translate_utils import fake_translate
from app.extract_utils import extract_tables_and_kv
from fastapi.responses import FileResponse 

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi import Form

import os

app = FastAPI()

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload and embed document
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    text = contents.decode("utf-8", errors="ignore")
    upsert_document(text)
    return {"status": "uploaded"}

# Query (chat)
@app.post("/chat/")
async def chat(query: str = Form(...)):
    matches = query_pinecone(query)
    context = " ".join([m['text'] for m in matches])
    answer = get_answer(query, context)
    return {"answer": answer}

@app.post("/summarize/")
async def summarize(file: UploadFile = File(...), prompt: str = Form("Summarize this document:")):
    contents = await file.read()
    text = contents.decode("utf-8", errors="ignore")
    summary = summarize_text(text, prompt)
    return JSONResponse(content={"summary": summary})


@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    transcript = transcribe_audio_file(audio_bytes, file.filename)
    return JSONResponse(content={"transcript": transcript})


@app.post("/translate/")
async def translate(
    file: UploadFile = File(...),
    to_language: str = Form(...)
):
    contents = await file.read()
    text = contents.decode("utf-8", errors="ignore")
    translated = fake_translate(text, to_language)
    return JSONResponse(content={"translated": translated})


@app.post("/extract/")
async def extract(
    file: UploadFile = File(...),
    output_format: str = Form("json")  # "json" or "excel"
):
    contents = await file.read()
    filename = file.filename

    if output_format == "excel":
        xls_path = extract_tables_and_kv(contents, filename, output_format="excel")
        return FileResponse(xls_path, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename="extracted_tables.xlsx")
    else:
        output = extract_tables_and_kv(contents, filename, output_format="json")
        return JSONResponse(content=output)