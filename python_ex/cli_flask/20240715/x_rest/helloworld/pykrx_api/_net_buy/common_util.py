from pykrx import stock
from datetime import datetime  
# BDay is business day , not birthday... 
from pandas.tseries.offsets import BDay 
import pandas as pd 
from tabulate import tabulate 
from dateutil.relativedelta import relativedelta 

now =  datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )

limit_per = 20
limit_pbr = 1.0 
limit_div = 3

day_diff = 2 

def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 
"""
    basic symbol and code. 
"""
def get_symbols_code( market ="KOSPI" ):
    # 오늘날 코스피에 상장되어 있는 주식의 이름과 티커 수집 
    today = datetime.today().strftime("%Y%m%d")
    ticker_list = stock.get_market_ticker_list(date = today, market =  market)
    #print(len(ticker_list))
    stock_symbols = pd.DataFrame({})
    stock_symbols['종목코드'] = ticker_list 
    stock_symbols['종목명'] = stock_symbols['종목코드'].map( lambda x : stock.get_market_ticker_name( x ))
    #print( stock_symbols )
    return stock_symbols 
def get_symbols_code_all():
    return get_symbols_code( market = "ALL" );
def get_symbols_code_kosdaq():
    return get_symbols_code( market = "KOSDAQ" );
def get_symbols_code_kospi():
    return get_symbols_code( market = "KOSPI" );
def get_symbols_code_konex():
    return get_symbols_code( market = "KONEX" );
"""
    basic etf symbol and code. 
"""
def get_symbols_code_etf():
    # 오늘날 코스피에 상장되어 있는 etf 이름과 티커 수집 
    today = datetime.today().strftime("%Y%m%d")
    ticker_list = stock.get_etf_ticker_list(date = today)
    #print(len(ticker_list))
    stock_symbols = pd.DataFrame({})
    stock_symbols['종목코드'] = ticker_list 
    stock_symbols['종목명'] = stock_symbols['종목코드'].map( lambda x : stock.get_etf_ticker_name( x ))
    #print( stock_symbols )
    return stock_symbols 
"""
    GET_MAKRET_FUNDAMENTAL 
"""
def get_market_fundamental( market = "KOSPI" ):
    global day_diff
    today = datetime.today()
    # get latest busniess day.. 
    # korea holiday.. 
    last_Bday = ( today - BDay(day_diff)).strftime("%Y%m%d")
    df = stock.get_market_fundamental( last_Bday , market = market ); 
    #tabulate_print( df );
    return df 
def get_market_fundamental_all():
    return get_market_fundamental( market = "ALL" );
def get_market_fundamental_kospi():
    return get_market_fundamental( market = "KOSPI" );
def get_market_fundamental_kosdaq():
    return get_market_fundamental( market = "KOSDAQ" );
def get_market_fundamental_limit_name():
    global day_diff
    for i in range(10):
        df_market = get_market_fundamental_all() 
        #print( df_market );
        df_symbols = get_symbols_code_all() 
        df_market = df_market[ ( df_market['PBR'] != 0 ) & (df_market['PER'] != 0 ) ]
        df_market = df_market[ ( df_market['PBR'] < limit_pbr ) & (df_market['PER'] < limit_per ) ]
        df_market = df_market[ ( df_market['DIV'] > limit_div ) ]
        #df_market =  df_market[['종목명','PER','PBR','DIV']].sort_values(by='PBR')
        df = df_market.merge( df_symbols , how='left' , left_on = '티커', right_on = '종목코드' )
        #tabulate_print( df[['종목코드','종목명','PER','PBR','DIV']].sort_values(by='DIV', ascending = False ) );
        if len( df.index) != 0 :
            break;
        day_diff += 1  
    return df 

if __name__=="__main__":
    #get_symbols_code_all();
    #get_symbols_code_konex();
    #get_market_fundamental_kosdaq();
    get_market_fundamental_limit_name();



