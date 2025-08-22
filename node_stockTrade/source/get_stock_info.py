# get_stock_info.py
import sys
from pykrx import stock

def main():
    ticker = sys.argv[1]
    today = stock.datetime.datetime.today().strftime('%Y%m%d')
    name = stock.get_market_ticker_name(ticker)
    df = stock.get_market_fundamental(today, today, ticker)
    if df.empty:
        print(f"{name},,,")
        return
    per = df['PER'].values[0]
    pbr = df['PBR'].values[0]
    div = df['DIV'].values[0]
    print(f"{name},{per},{pbr},{div}")

if __name__ == "__main__":
    main()

