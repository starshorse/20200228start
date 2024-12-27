from pykrx import stock
from datetime import datetime  
# 오늘날 코스피에 상장되어 있는 주식의 이름과 티커 수집 
today = datetime.today().strftime("%Y%m%d")
ticker_list = stock.get_market_ticker_list(date = today, market="KOSPI")
symbol_list = []
for ticker in ticker_list:
    symbol = stock.get_market_ticker_name(ticker)
    symbol_list.append(symbol)
# 코스피 상장 주식의 개수 확인
print(len(ticker_list))
print(len(symbol_list))
