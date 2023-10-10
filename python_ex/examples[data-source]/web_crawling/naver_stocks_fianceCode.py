import sys 
import pandas as pd
import requests

code = sys.argv[1]

if len( sys.argv ) != 2:
    code = '005930'

URL = f"https://finance.naver.com/item/main.nhn?code={code}"
r = requests.get(URL)
df = pd.read_html(r.text)[3]
df.set_index(df.columns[0],inplace=True)
df.index.rename('주요재무정보', inplace=True)
df.columns = df.columns.droplevel(2)
annual_date = pd.DataFrame(df).xs('최근 연간 실적',axis=1)
quater_date = pd.DataFrame(df).xs('최근 분기 실적',axis=1)
print( quater_date )
