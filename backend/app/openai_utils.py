import openai
import os

openai.api_key = os.environ["AZURE_OPENAI_API_KEY"]
api_base = os.environ["AZURE_OPENAI_ENDPOINT"]

def embed_text(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002",
        api_base=api_base
    )
    return response['data'][0]['embedding']

def get_answer(question, context):
    response = openai.ChatCompletion.create(
        api_base=api_base,
        model="gpt-35-turbo",  # Or "gpt-4"
        messages=[
            {"role": "system", "content": "Answer as helpfully as possible using the context."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"}
        ]
    )
    return response['choices'][0]['message']['content']
