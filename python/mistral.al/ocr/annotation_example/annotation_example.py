import os
from mistralai import Mistral, DocumentURLChunk, ImageURLChunk, ResponseFormat
from mistralai.extra import response_format_from_pydantic_model
from models import Document

api_key = os.environ["MISTRAL_API_KEY"]

client = Mistral(api_key=api_key)

# Client call
response = client.ocr.process(
    model="mistral-ocr-latest",
    pages=list(range(8)),
    document=DocumentURLChunk(
      document_url="https://arxiv.org/pdf/2410.07073"
    ),
    document_annotation_format=response_format_from_pydantic_model(Document),
    include_image_base64=True
  )

print( response );
