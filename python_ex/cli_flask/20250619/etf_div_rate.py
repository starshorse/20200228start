import requests
import pandas as pd
from bs4 import BeautifulSoup
from pykrx import stock
from datetime import datetime, timedelta
import time

def get_one_year_ago():
    today = datetime.today()
    one_year_ago = today - timedelta(days=365)
    return one_year_ago.strftime("%Y%m%d"), today.strftime("%Y%m%d")

def get_etf_list():
    url = "https://finance.naver.com/api/sise/etfItemList.nhn"
    response = requests.get(url)
    data = response.json()
    return data["result"]["etfItemList"]

def is_inverse_or_leverage(name):
    keywords = ['인버스', '레버리지', '2X', '곱', '선물']
    return any(k in name.upper() or k in name for k in keywords)

def get_dividend_yield_and_fee(etf_code):
    try:
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
                        except:
                            dividend = None
                    elif "총보수" in th:
                        try:
                            fee = float(td)
                        except:
                            fee = None
        return dividend, fee
    except Exception as e:
        print(f"[크롤링 에러] {etf_code}: {e}")
        return None, None

def get_1y_return(etf_code, start_date, end_date):
    try:
        df = stock.get_etf_ohlcv_by_date(start_date, end_date, etf_code)
        if df.empty or len(df) < 2:
            return None
        start_price = df['종가'].iloc[0]
        end_price = df['종가'].iloc[-1]
        # 데이터 유효성 검사
        if start_price in [0, None] or end_price in [0, None]:
            return None
        if pd.isna(start_price) or pd.isna(end_price):
            return None

        return round(((end_price - start_price) / start_price) * 100, 2)
    except Exception as e:
        print(f"[1Y 수익률 에러] {etf_code}: {e}")
        return None

def get_provider(etf_name):
    providers = {
        "KODEX": "삼성자산운용",
        "TIGER": "미래에셋자산운용",
        "KBSTAR": "KB자산운용",
        "HANARO": "NH-Amundi",
        "KOSEF": "키움투자자산운용",
        "KINDEX": "한국투자신탁운용"
    }
    for keyword, name in providers.items():
        if keyword in etf_name.upper():
            return name
    return "기타"

def guess_market(etf_name):
    if "코스닥" in etf_name.upper():
        return "KOSDAQ"
    elif "200" in etf_name or "KOSPI" in etf_name.upper():
        return "KOSPI"
    else:
        return "기타"

def get_high_dividend_low_volatility_etfs(top_n=20):
    etf_list = get_etf_list()
    start_date, end_date = get_one_year_ago()
    result = []

    for index , etf in enumerate( etf_list ):
        code = etf["itemcode"]
        name = etf["itemname"]

        if is_inverse_or_leverage(name):
            continue

        dy, fee = get_dividend_yield_and_fee(code)
        one_year_return = get_1y_return(code, start_date, end_date)
        print( dy );

        #if dy is not None and one_year_return is not None and -5 <= one_year_return <= 10:
        if one_year_return is not None:
            result.append({
                "종목코드": code,
                "종목명": name,
                "자산운용사": get_provider(name),
                "시장": guess_market(name),
                #"12개월 배당수익률(%)": dy,
                "1년 수익률(%)": one_year_return,
                #"총 수익률(%)": round(dy + one_year_return, 2),
                "총보수(%)": fee if fee is not None else "-"
            })
        time.sleep(0.3)  # 과도한 요청 방지

    df = pd.DataFrame(result)
    #df = df.sort_values(by="12개월 배당수익률(%)", ascending=False).reset_index(drop=True)
    df = df.sort_values(by="1년 수익률(%)", ascending=False).reset_index(drop=True)
    return df.head(top_n)

if __name__ == "__main__":
    df = get_high_dividend_low_volatility_etfs()
    print(df.to_string(index=False))
    df.to_csv("ETF_저변동_고배당_총보수포함.csv", index=False)

