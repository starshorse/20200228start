from pydantic import BaseModel, Field
from typing import List, Dict, Any

class TableData(BaseModel):
    table_id: str = Field(..., description="표 고유 ID")
    headers: List[str] = Field(..., description="열 헤더 목록")
    rows: List[List[str]] = Field(..., description="데이터 행 리스트")
    row_count: int = Field(..., description="행 개수")
    column_count: int = Field(..., description="열 개수")

class DocumentTables(BaseModel):
    file_name: str = Field(..., description="원본 파일명")
    total_tables: int = Field(..., description="표 개수")
    tables: List[TableData] = Field(..., description="추출된 표 데이터")
    metadata: Dict[str, Any] = Field(..., description="처리 메타정보")
