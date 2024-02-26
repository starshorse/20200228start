from pykrx import stock
import pandas as pd
from dateutil.relativedelta import relativedelta 
from tabulate import tabulate 
import datetime 
import matplotlib.pyplot as plt 

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )
before_one_year = now - relativedelta( years = 1 )
def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 

def get_df_period_sp_all_buy( start , end ):
    df = stock.get_market_trading_value_by_date( start , end , 'ALL' , on="매수" );
    return df;

def get_df_period( before_period , code = "005930"):
    df = stock.get_market_trading_value_by_date( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    return df;
def get_df_period_buy( before_period , code = "005930"):
    df = stock.get_market_trading_value_by_date( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code , on="매수" );
    return df;
def get_df_period_sell( before_period , code = "005930"):
    df = stock.get_market_trading_value_by_date( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code , on="매도" );
    return df;

"""
  시장의 거래대금 추이    
"""
def get_market_trading_value_year_all():
    df_year = get_df_period( before_one_year ,"ALL" );
    print( df_year );
    return df_year 
def get_market_trading_value_year_all_buy():
    df_year = get_df_period_buy( before_one_year ,"ALL" );
    print( df_year );
    return df_year 
def get_market_trading_value_year_KOSPI_buy():
    df_year = get_df_period_buy( before_one_year ,"KOSPI" );
    print( df_year );
    return df_year 
def get_market_trading_value_year_KOSDAQ_buy():
    df_year = get_df_period_buy( before_one_year ,"KOSDAQ" );
    print( df_year );
    return df_year 

if __name__ == '__main__':
    get_market_trading_value_year_all();
    get_market_trading_value_year_all_buy();
    df = get_market_trading_value_year_KOSDAQ_buy();
    df = get_market_trading_value_year_KOSPI_buy();
    df = get_df_period_sp_all_buy( '20210101', '20211231' )
    df.plot();
    plt.show();






