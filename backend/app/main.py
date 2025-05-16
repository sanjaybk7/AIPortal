from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.pinecone_utils import upsert_document, query_pinecone
from app.openai_utils import get_answer
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
