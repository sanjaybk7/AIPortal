import os
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import pandas as pd
import tempfile

AZURE_FORMRECOGNIZER_KEY = os.environ["AZURE_FORMRECOGNIZER_KEY"]
AZURE_FORMRECOGNIZER_ENDPOINT = os.environ["AZURE_FORMRECOGNIZER_ENDPOINT"]

client = DocumentAnalysisClient(
    endpoint=AZURE_FORMRECOGNIZER_ENDPOINT,
    credential=AzureKeyCredential(AZURE_FORMRECOGNIZER_KEY)
)

def extract_tables_and_kv(file_bytes, filename, output_format="json"):
    with tempfile.NamedTemporaryFile(delete=False, suffix=filename) as tmp:
        tmp.write(file_bytes)
        tmp.flush()
        with open(tmp.name, "rb") as f:
            poller = client.begin_analyze_document("prebuilt-document", document=f)
            result = poller.result()

    # Extract tables
    tables = []
    for table in result.tables:
        rows = []
        for i, row in enumerate(table.rows):
            row_data = []
            for cell in row.cells:
                row_data.append(cell.content)
            rows.append(row_data)
        tables.append(rows)

    # Extract key-value pairs
    kv_pairs = {}
    for kv in result.key_value_pairs:
        if kv.key and kv.value:
            kv_pairs[kv]()_
