import requests
import pandas as pd
from bs4 import BeautifulSoup
from pykrx import stock
from datetime import datetime, timedelta

# 1년 전 날짜 계산
def get_one_year_ago():
    today = datetime.today()
    one_year_ago = today - timedelta(days=365)
    return one_year_ago.strftime("%Y%m%d"), today.strftime("%Y%m%d")

# ETF 전체 목록 (네이버)
def get_etf_list():
    url = "https://finance.naver.com/api/sise/etfItemList.nhn"
    response = requests.get(url)
    data = response.json()
    return data["result"]["etfItemList"]

# 인버스 / 레버리지 여부
def is_inverse_or_leverage(name):
    keywords = ['인버스', '레버리지', '2X', '곱', '선물']
    return any(k in name.upper() or k in name for k in keywords)

# 배당수익률과 총보수 크롤링
def get_dividend_yield_and_fee(etf_code):
    print(f"[INFO] 크롤링: {etf_code}")
    url = f"https://finance.naver.com/item/main.naver?code={etf_code}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    tables = soup.find_all("table")

    dividend = None
    fee = None

    for table in tables:
        if "배당수익률" in table.text or "총보수" in table.text:
            rows = table.find_all("tr")
            for row in rows:
                cols = row.find_all("td")
                if len(cols) < 2:
                    continue
                th = row.find("th").text.strip()
                td = cols[-1].text.strip().replace('%', '').replace(',', '')
                if "배당수익률" in th:
                    try:
                        dividend = float(td)
                        print(f"  [OK] 배당수익률: {dividend}%")
                    except:
                        print(f"  [ERR] 배당수익률 변환 실패: '{td}'")
                elif "총보수" in th:
                    try:
                        fee = float(td)
                        print(f"  [OK] 총보수: {fee}%")
                    except:
                        print(f"  [ERR] 총보수 변환 실패: '{td}'")
    return dividend, fee

# 1년 수익률 계산
def get_1y_return(etf_code, start_date, end_date):
    print(f"[INFO] 1년 수익률 계산: {etf_code}")
    df = stock.get_etf_ohlcv_by_date(start_date, end_date, etf_code)
    if df.empty or len(df) < 2:
        print("[WARN] 데이터 부족")
        return None
    start_price = df['종가'].iloc[0]
    end_price = df['종가'].iloc[-1]
    print(f"  시작가: {start_price}, 종료가: {end_price}")

    if start_price in [0, None] or pd.isna(start_price) or pd.isna(end_price):
        print("[WARN] 가격 데이터 오류")
        return None
    result = round(((end_price - start_price) / start_price) * 100, 2)
    print(f"  [OK] 1년 수익률: {result}%")
    return result

# 실행
if __name__ == "__main__":
    etfs = get_etf_list()
    print(f"전체 ETF 수: {len(etfs)}")

    # 첫 ETF 하나만 테스트
    for etf in etfs:
        code = etf["itemcode"]
        name = etf["itemname"]
        print(f"\n✅ 테스트 종목: {name} ({code})")

        if is_inverse_or_leverage(name):
            print("[SKIP] 인버스 또는 레버리지 종목")
            continue

        # 날짜
        start_date, end_date = get_one_year_ago()

        # 수익률 + 배당 + 보수
        dy, fee = get_dividend_yield_and_fee(code)
        one_year_return = get_1y_return(code, start_date, end_date)

        print("\n📊 결과 요약:")
        print(f"  종목명: {name}")
        print(f"  배당수익률: {dy}")
        print(f"  총보수: {fee}")
        print(f"  1년 수익률: {one_year_return}")
        break  # 디버깅용이므로 1개만

