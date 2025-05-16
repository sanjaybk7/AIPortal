import openai
import os

openai.api_key = os.environ["AZURE_OPENAI_API_KEY"]
api_base = os.environ["AZURE_OPENAI_ENDPOINT"]

def summarize_text(text, prompt="Summarize this document:"):
    response = openai.ChatCompletion.create(
        api_base=api_base,
        model="gpt-35-turbo",  # or "gpt-4"
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": text}
        ]
    )
    return response['choices'][0]['message']['content']
