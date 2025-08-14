import pandas as pd
import json
from sqlalchemy import create_engine, text

# ✅ SQL Server 접속 정보 (수정 필요)
server = '34.64.60.213'           # 또는 '127.0.0.1', 'myserver.database.windows.net'
database = 'demo'
username = 'sqlserver'
password = '!csdlwlof#1286'

# ✅ SQLAlchemy 연결 문자열
connection_string = (
    f"mssql+pyodbc://{username}:{password}@{server}/{database}"
    "?driver=ODBC+Driver+17+for+SQL+Server"
)

# ✅ SQLAlchemy 엔진 생성
engine = create_engine(connection_string, echo=False, fast_executemany=True)

# ✅ JSON → DataFrame 로딩
with open("fixed_merged_table_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

df = pd.DataFrame(data)

# ✅ 'seq'는 자동 증가 필드 → 제외
excluded_columns = {"seq"}

def row_to_sql_insert(table_name: str, row: pd.Series) -> str:
    columns = [col for col in row.index if col not in excluded_columns]
    values = []

    for col in columns:
        value = row[col]
        if isinstance(value, str):
            escaped = value.replace("'", "''")
            values.append(f"'{escaped}'")
        elif pd.isna(value):
            values.append("NULL")
        else:
            values.append(str(value))

    column_list = ", ".join(f"[{col}]" for col in columns)
    value_list = ", ".join(values)

    return f"INSERT INTO [{table_name}] ({column_list}) VALUES ({value_list});"

# ✅ INSERT SQL 실행
table_name = "TB_age_opt_ocr"
insert_statements = [row_to_sql_insert(table_name, row) for _, row in df.iterrows()]

with engine.connect() as conn:
    trans = conn.begin()
    try:
        for stmt in insert_statements:
            conn.execute(text(stmt))
        trans.commit()
        print(f"✅ 총 {len(insert_statements)}개의 SQL INSERT가 성공적으로 실행되었습니다.")
    except Exception as e:
        trans.rollback()
        print(f"❌ SQL 실행 중 오류 발생: {e}")

