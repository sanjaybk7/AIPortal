# AI Portal MVP: Chat with Your Data

## Stack
- Frontend: React
- Backend: FastAPI (Python)
- LLM: Azure OpenAI (embeddings + chat)
- Vector DB: Pinecone

## How To Run

1. Clone this repo.
2. Setup backend:
   - `cd backend`
   - `python -m venv venv && source venv/bin/activate`
   - `pip install -r requirements.txt`
   - Set environment variables as per .env.example
   - `uvicorn app.main:app --reload`
3. Setup frontend:
   - `cd frontend`
   - `npm install`
   - `npm start`
4. Open [http://localhost:3000](http://localhost:3000) and try uploading a document and chatting with it!

## Notes
- You need valid Azure OpenAI and Pinecone credentials.
- This is a minimal MVP; add authentication, security, error handling for production use.
