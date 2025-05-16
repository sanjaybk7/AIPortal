import pinecone
import os
from app.openai_utils import embed_text

pinecone.init(api_key=os.environ["PINECONE_API_KEY"], environment=os.environ["PINECONE_ENVIRONMENT"])
index = pinecone.Index(os.environ["PINECONE_INDEX_NAME"])

def upsert_document(text):
    chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
    for idx, chunk in enumerate(chunks):
        embedding = embed_text(chunk)
        index.upsert([(f"doc-{idx}", embedding, {"text": chunk})])

def query_pinecone(query):
    embedding = embed_text(query)
    result = index.query(vector=embedding, top_k=5, include_metadata=True)
    return [match['metadata'] for match in result['matches']]
