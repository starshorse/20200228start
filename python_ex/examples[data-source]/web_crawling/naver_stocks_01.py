#float변환을 위해 따옴표 제거# 모듈 가져오기
from pykrx import stock
from datetime import datetime  
import requests
from bs4 import BeautifulSoup
import pandas as pd
import sys

sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import  my_pandas  as pandas 
#import korsp_106_pykrx as mykrx 

def getKSP_stock_data():
    # 오늘날 코스피에 상장되어 있는 주식의 이름과 티커 수집 
    today = datetime.today().strftime("%Y%m%d")
    ticker_list = stock.get_market_ticker_list(date = today, market="KOSPI")

    per_selector = "#_per"
    pbr_selector = "#_pbr"
    dividend_yield_selector = "#_dvr"

    # 크롤링을 사용하여 증권 데이터 수집하기
    pers = []
    pbrs = []
    dividend_yields = []
    stock_name = []

    for ticker in ticker_list:
        url = f"https://finance.naver.com/item/main.nhn?code={ticker}"
        html = requests.get(url, headers={'User-agent':'Mozilla/5.0'})
        soup = BeautifulSoup(html.text, "lxml")
        per = soup.select(per_selector)
        pbr = soup.select(pbr_selector)
        dividend_yield = soup.select(dividend_yield_selector)
        stock_name.append( stock.get_market_ticker_name( ticker ))

        if not per:  # 리스트가 비어있을 경우 None으로 변환
            per = [None]
        for pe in per:
            if pe != None:
                per_text = pe.text
                per_text = per_text.replace(",", "")  # float변환을 위해 따옴표 제거
                pers.append(float(per_text))
            else:
                per_text = pe
                pers.append(per_text)
        if not pbr:  # 리스트가 비어있을 경우 None으로 변환
            pbr = [None]
        for pb in pbr:
            if pb != None:
                pbr_text = pb.text
                pbr_text = pbr_text.replace(",", "")  # float변환을 위해 따옴표 제거
                pbrs.append(float(pbr_text))
            else:
                pbr_text = pb
                pbrs.append(pbr_text)
            
        if not dividend_yield:  # 리스트가 비어있을 경우 None으로 변환
            dividend_yield = [None]
        for d in dividend_yield:
            if d != None:
                dividend_yield_text = d.text
                dividend_yield_text = dividend_yield_text.replace(",", "")  # float변환을 위해 따옴표 제거
                dividend_yields.append(float(dividend_yield_text))
            else:
                dividend_yield_text = d
                dividend_yields.append(dividend_yield_text)


    #print( pbrs )     
    df = pd.DataFrame({'CODE': ticker_list , 'NAME': stock_name, 'PBR' : pbrs , 'PER': pers, 'DIV': dividend_yields }) 
    print(df.head(10))

    pandas.to_json( df , 'krx_kspi.json' )


if __name__ == "__main__":
    getKSP_stck_data();




