import os
import json
import base64
from dotenv import load_dotenv
from mistralai import Mistral, models
from mistralai.extra import response_format_from_pydantic_model
from models import DocumentTables  # Pydantic 스키마

# ────────────────────────────────
# 1) 환경 변수 & 클라이언트
# ────────────────────────────────
load_dotenv()
API_KEY = os.getenv("MISTRAL_API_KEY")
if not API_KEY:
    raise RuntimeError("MISTRAL_API_KEY를 .env에 설정하세요.")

client = Mistral(api_key=API_KEY)
print(API_KEY)
# ────────────────────────────────
# 2) 파일(PNG·JPG·PDF) 1장 → 표 추출
# ────────────────────────────────
def extract_tables(file_path: str, file_name: str) -> dict:
    """단일 파일 → 표 JSON 반환"""

    # 2‑1. 파일 로드
    try:
        with open(file_path, "rb") as f:
            binary = f.read()
    except FileNotFoundError:
        print(f"[Error] 파일 없음 → {file_path}")
        return {}

    # 2‑2. 확장자 파싱
    ext = os.path.splitext(file_path)[1].lstrip(".").lower()
    if ext == "jpg":
        ext = "jpeg"

    if ext not in {"png", "jpeg", "pdf"}:
        print(f"[Skip] 지원하지 않는 확장자 → {file_name}")
        return {}

    # 2‑3. Base64 & Data‑URI
    base64_str = base64.b64encode(binary).decode("utf-8")
    mime_type = f"{'image' if ext in {'png', 'jpeg'} else 'application'}/{ext}"
    data_uri = f"data:{mime_type};base64,{base64_str}"

    # 2‑4. 전송 파라미터
    payload = (
        {"type": "image_url", "image_url": data_uri}
        if ext in {"png", "jpeg"}
        else {"type": "document_url", "document_url": data_uri}
    )

    print( DocumentTables );
    print( response_format_from_pydantic_model(DocumentTables) );
    # 2‑5. OCR 호출
    try:
        resp = client.ocr.process(
            model="mistral-ocr-latest",
            document=payload,
            document_annotation_format=response_format_from_pydantic_model(DocumentTables),
            include_image_base64=False,
        )
    except models.SDKError as e:
        print(f"[API Error] {file_name} 처리 실패: {e}")
        return {}

    # 2‑6. 결과 파싱 (문자열 or Pydantic 객체 모두 수용)
    annotation = getattr(resp, "document_annotation", None) or getattr(resp, "image_annotation", None)

    if annotation is None:
        print(f"[Warn] {file_name} → annotation 없음")
        return {}

    if isinstance(annotation, str):
        try:
            result = json.loads(annotation)
        except json.JSONDecodeError:
            result = {"raw_annotation": annotation}
    else:
        # Pydantic 객체
        result = (
            annotation.model_dump()
            if hasattr(annotation, "model_dump")
            else annotation.dict()
        )

    # 2‑7. 메타데이터
    result["metadata"] = {
        "file_name": file_name,
        "processed_pages": len(resp.pages) if resp and resp.pages else 0,
    }
    return result

# ────────────────────────────────
# 3) 배치 실행
# ────────────────────────────────
def main():
    input_dir = "images"
    output_dir = "results"
    os.makedirs(output_dir, exist_ok=True)

    for fname in os.listdir(input_dir):
        if not fname.lower().endswith((".png", ".jpg", ".jpeg", ".pdf")):
            continue

        path = os.path.join(input_dir, fname)
        print(f"처리 중 → {fname}")

        tables_json = extract_tables(path, fname)

        if not tables_json:
            print(f"[Fail] {fname}")
            continue

        out_path = os.path.join(output_dir, f"{fname}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(tables_json, f, ensure_ascii=False, indent=2)
        print(f"[Done] 결과 저장 → {out_path}")

if __name__ == "__main__":
    main()
