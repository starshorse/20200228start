# data_utils.py

import os
import pandas as pd
import numpy as np

def create_random_excel(
    file_path, 
    columns=None, 
    num_rows=100,
    stock_column='종목명'
):
    """
    엑셀 파일이 없을 때 요청한 구조에 맞춰 랜덤 데이터로 생성 후 저장
    """
    if columns is None:
        columns = [
            '종목코드', '종목명', '시가총액', 'PER', 'PBR',
            '배당금', '배당율', '부채비율', '시장'
        ]

    stock_names = [
        '삼성전자', 'LG화학', 'NAVER', '카카오', '현대차', 
        '포스코', 'SK하이닉스', '셀트리온', 'KB금융', '신한지주'
    ]
    markets = ['코스피', '코스닥', 'NextTr']

    data = {}
    for col in columns:
        if col == '종목코드':
            data[col] = [
                f'{x:06d}'
                for x in np.random.choice(range(100000, 999999), num_rows, replace=False)
            ]
        elif col == '종목명':
            data[col] = np.random.choice(stock_names, size=num_rows)
        elif col == '시가총액':
            data[col] = np.random.randint(1000, 500000, size=num_rows) * 10000
        elif col == 'PER':
            data[col] = np.where(np.random.rand(num_rows) > 0.1, 
                                 np.round(np.random.uniform(1, 60, num_rows), 2),
                                 '-')
        elif col == 'PBR':
            data[col] = np.where(np.random.rand(num_rows) > 0.1, 
                                 np.round(np.random.uniform(0.2, 10, num_rows), 2),
                                 '-')
        elif col == '배당금':
            data[col] = np.round(np.random.uniform(0, 5000, num_rows), 0)
        elif col == '배당율':
            data[col] = np.round(np.random.uniform(0, 1, num_rows), 2)
        elif col == '부채비율':
            data[col] = np.round(np.random.uniform(5, 250, num_rows), 2)
        elif col == '시장':
            data[col] = np.random.choice(markets, size=num_rows)
        else:
            data[col] = np.random.randint(1, 100, size=num_rows)
    df = pd.DataFrame(data)
    df.to_excel(file_path, index=False)
    print(f"랜덤 데이터로 엑셀 생성 완료: {file_path}")
    return df

def workflow(config):
    """
    config (dict) 형태로 모든 인자 입력
    
    엑셀 파일이 없으면 생성 후 로드.
    클립보드 데이터 불러오기 시 에러 발생 시 에러 메시지 출력하고
    예제 데이터로 대체 후 처리 수행
    
    이후 기본 데이터 병합, PBR 전처리, 결과 출력함.
    """
    excel_path = config.get('excel_path')
    stock_column = config.get('stock_column', '종목명')
    example_values = config.get('example_values', ['희림', '롯데지주', '신한지주'])
    join_columns = config.get('join_columns', [stock_column])
    pbr_column = config.get('pbr_column', 'PBR')
    invalid_pbr_values = config.get('invalid_pbr_values', ['-'])
    lowest_n = config.get('lowest_n', 5)
    clipboard_rename_dict = config.get('clipboard_rename_dict', {'등락률': '등락률%'})
    excel_columns = config.get('excel_columns', [
        '종목코드','종목명', '시가총액','PER','PBR','배당금','배당율','부채비율','시장'
    ])

    # 1) 엑셀 파일 로딩 또는 생성
    if not os.path.exists(excel_path):
        df = create_random_excel(
            excel_path, columns=excel_columns, stock_column=stock_column
        )
    else:
        df = pd.read_excel(excel_path)
        print(f"엑셀 로딩 완료: {excel_path}")

    # 2) 종목명 컬럼 좌우 공백 제거
    df[stock_column] = df[stock_column].astype(str).str.strip()

    # 3) 예제 데이터프레임 생성 (병합용)
    df1 = pd.DataFrame({stock_column: example_values})

    # 4) df1과 df left join
    df2 = pd.merge(df1, df, on=join_columns, how='left')
    print(f"\n병합 예시 (df2):\n{df2.head()}")

    # 5) 클립보드 데이터 로드 시도 및 예외처리
    try:
        df3 = pd.read_clipboard()
        print("(클립보드 데이터 감지됨)")
    except Exception as e:
        print(f"클립보드 데이터 로딩 실패: {e}")
        # 예제 데이터로 대체
        df3 = pd.DataFrame({
            stock_column: example_values,
            '등락률': np.random.uniform(-10, 10, len(example_values))
        })
        print("(예제 데이터로 대체하여 처리합니다)")

    # 6) 컬럼명 변경
    df3 = df3.rename(columns=clipboard_rename_dict)

    # 7) df3와 df left join
    df4 = pd.merge(df3, df, on=join_columns, how='left')
    print(f"\ndf4 병합 결과:\n{df4.head()}")

    # 8) PBR '-' 값 제거 및 타입 변환
    df4_clean = df4[~df4[pbr_column].isin(invalid_pbr_values)].copy()
    df4_clean[pbr_column] = df4_clean[pbr_column].astype(float)

    # 9) PBR 기준 정렬, 하위 N개 추출
    df4_sorted = df4_clean.sort_values(pbr_column)
    df4_lowest = df4_sorted.head(lowest_n)
    print(f"\n{pbr_column} 하위 {lowest_n}개:\n{df4_lowest}")

    # 결과 반환
    return {
        'df': df,
        'df2': df2,
        'df4': df4,
        'df4_lowest': df4_lowest
    }

