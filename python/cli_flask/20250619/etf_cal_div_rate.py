import pandas as pd

def calculate_total_dividend(dividends, schedule):
    """
    주기별 분배금을 연간 분배금으로 자동 환산
    """
    if not dividends or not isinstance(dividends, list):
        return 0.0

    n = len(dividends)
    if schedule == "월":
        # 월별 지급 → 합계 그대로 사용 (12개월 기준)
        if n < 12:
            print(f"⚠️ 월배당인데 {n}개월치만 있음: {dividends}")
        return sum(dividends)
    elif schedule == "분기":
        # 분기별 지급 → 최대 4개 지급
        if n < 4:
            print(f"⚠️ 분기배당인데 {n}분기만 있음: {dividends}")
        return sum(dividends)
    elif schedule == "연":
        return sum(dividends)
    else:
        # 모를 경우 평균값 × 12개월 기준
        return sum(dividends) * (12 / n) if n > 0 else 0.0


def calculate_annual_dividend_yield_auto(dividends, nav, schedule):
    """
    자동 분배주기 감지 → 연간 분배금 → 연간 수익률 (%) 계산
    """
    try:
        if nav == 0:
            return 0.0
        total_div = calculate_total_dividend(dividends, schedule)
        return round((total_div / nav) * 100, 2)
    except Exception as e:
        print(f"오류 발생: {e}")
        return None


data = [
    {"ETF명": "TIGER 국채3년", "기준가": 10000, "분배주기": "분기", "분배금내역": [65, 70, 68, 69]},
    {"ETF명": "TIGER 달러단기채", "기준가": 9800, "분배주기": "월", "분배금내역": [20]*12},
    {"ETF명": "TIGER 200", "기준가": 10200, "분배주기": "연", "분배금내역": [270]}
]

df = pd.DataFrame(data)

df["연분배수익률(%)"] = df.apply(
    lambda row: calculate_annual_dividend_yield_auto(row["분배금내역"], row["기준가"], row["분배주기"]),
    axis=1
)

print(df[["ETF명", "기준가", "분배주기", "연분배수익률(%)"]])

