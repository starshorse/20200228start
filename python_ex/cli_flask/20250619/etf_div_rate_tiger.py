import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# 샘플 TIGER ETF 목록 (실제로는 더 확장 가능)
tiger_etfs = [
    {"name": "TIGER 200", "code": "102110"},
    {"name": "TIGER 미국나스닥100", "code": "133690"},
    {"name": "TIGER 차이나전기차SOLACTIVE", "code": "371460"},
    {"name": "TIGER KRX기후변화솔루션", "code": "447450"},
    {"name": "TIGER MSCI리츠", "code": "329650"}
]

# 분배금 수익률 크롤링 함수
def get_tiger_dividend_yield(etf_code):
    url = f"https://www.tigeretf.com/kr/product/product-basic.do?etfId={etf_code}"
    try:
        res = requests.get(url, timeout=5)
        soup = BeautifulSoup(res.text, 'html.parser')

        table = soup.find("div", class_="tbl-type1 scroll-x")
        if not table:
            return None

        rows = table.find_all("tr")
        for row in rows:
            if "분배금수익률" in row.text:
                td = row.find_all("td")[-1].text.strip()
                return float(td.replace('%', '').replace(',', ''))
    except Exception as e:
        print(f"[ERROR] {etf_code}: {e}")
    return None

# 수집 및 정리
results = []

for etf in tiger_etfs:
    code = etf["code"]
    name = etf["name"]
    print(f"🔍 {name} ({code}) 처리 중...")

    dy = get_tiger_dividend_yield(code)
    print(f"  ➤ 배당수익률: {dy if dy is not None else '정보 없음'}")

    results.append({
        "종목명": name,
        "종목코드": code,
        "배당수익률(%)": dy if dy is not None else "-"
    })
    time.sleep(0.3)

# 결과 출력 및 저장
df = pd.DataFrame(results)
print("\n📊 최종 결과:")
print(df.to_string(index=False))
df.to_csv("TIGER_ETF_배당수익률.csv", index=False, encoding="utf-8-sig")
