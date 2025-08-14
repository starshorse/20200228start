from pydantic import BaseModel
from typing import List, Dict, Any

# Document Annotation response format
class Document(BaseModel):
  language: str
  chapter_titles: list[str]
  urls: list[str]
