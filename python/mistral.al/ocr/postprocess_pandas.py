import os
import json

# ✅ 고정할 headers 값
FIXED_HEADERS = [
    "Material (Customer)",
    "Start date of movement",
    "Material status",
    "Quantity",
    "Unrestricted-use stock"
]

# ✅ JSON 파일이 저장된 디렉토리 경로
json_dir = "./results"  # 실제 디렉토리 경로로 변경하세요

# ✅ 결과 누적 저장
all_table_data = []

# ✅ 디렉토리 내 JSON 파일 순회
for file_name in os.listdir(json_dir):
    if file_name.endswith(".json"):
        file_path = os.path.join(json_dir, file_name)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            # 테이블 처리
            for table in data.get("tables", []):
                rows = table.get("rows", [])

                # 행 수와 헤더 수 일치 여부 확인
                for row in rows:
                    if len(row) != len(FIXED_HEADERS):
                        print(f"⚠️  열 개수가 일치하지 않음: {file_name} → row: {row}")
                        continue

                    entry = dict(zip(FIXED_HEADERS, row))
                    entry["source_file"] = file_name  # 출처 파일명 기록
                    all_table_data.append(entry)

        except Exception as e:
            print(f"❌ 오류 발생: {file_name} 처리 중 오류: {e}")

# ✅ 결과 확인 (처음 5개만)
for entry in all_table_data[:5]:
    print(entry)

# ✅ 결과 저장 (선택 사항)
with open("fixed_merged_table_data.json", "w", encoding="utf-8") as out_f:
    json.dump(all_table_data, out_f, ensure_ascii=False, indent=2)

print(f"✅ 총 {len(all_table_data)}개의 행(row)이 저장되었습니다.")

