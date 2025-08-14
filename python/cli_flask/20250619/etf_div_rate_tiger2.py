import requests
import pandas as pd

def fetch_tiger_annual_distribution():
    url = "https://www.tigeretf.com/kr/api/distribution/etf/year"
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.tigeretf.com/ko/distribution/annual/list.do?chart=Year02",
        "Content-Type": "application/json"
    }
    payload = {
        "chartType": "Year02"
    }

    try:
        res = requests.post(url, json=payload, headers=headers, timeout=5)
        res.raise_for_status()
        data = res.json()

        rows = []
        for etf in data["data"]:
            etf_name = etf["etfName"]
            etf_code = etf["etfId"]

            for record in etf["list"]:
                rows.append({
                    "ETF명": etf_name,
                    "종목코드": etf_code,
                    "연도": record["baseYear"],
                    "1주당분배금(원)": record["amount"],
                    "분배금지급일": record["payDate"]
                })

        df = pd.DataFrame(rows)
        return df

    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return pd.DataFrame()

# 실행 예시
if __name__ == "__main__":
    df = fetch_tiger_annual_distribution()
    if not df.empty:
        print("\n📊 TIGER ETF 연간 분배금 데이터 (샘플):")
        print(df.head(10).to_string(index=False))
        df.to_csv("TIGER_연간_분배금_데이터.csv", index=False, encoding="utf-8-sig")
    else:
        print("❌ 데이터를 가져오지 못했습니다.")

