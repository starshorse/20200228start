from pykrx import stock
import pandas as pd 
from tabulate import tabulate 
from dateutil.relativedelta import relativedelta 
import datetime 
from common_util import get_market_fundamental_limit_name  
"""
    투자자별 순매수 상위 종목 
"""

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 2 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )

def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 

def get_df_period_net( before_period , market = "KOSPI" , buyer = "외국인"):
    df = stock.get_market_net_purchases_of_equities( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), market , buyer )
    df = df.head(50)
    df_market_limit = get_market_fundamental_limit_name() 
    df_market_limit = df_market_limit.drop('종목명', axis = 1);
    df_LEFT = df_market_limit.merge( df , how='inner' , left_on ='종목코드', right_on = '티커' )
    return df_LEFT 
def get_df_period_net_kospi_foreign( before_period ):
    return get_df_period_net( before_period , "KOSPI", "외국인");
def get_df_period_net_kosdaq_foreign( before_period ):
    return get_df_period_net( before_period , "KOSDAQ", "외국인");
def get_df_period_net_kospi_domestic( before_period ):
    return get_df_period_net( before_period , "KOSPI", "기관합계");
def get_df_period_net_kosdaq_domestic( before_period ):
    return get_df_period_net( before_period , "KOSDAQ", "기관합계");
def get_df_period_net_kospi_annt( before_period ):
    return get_df_period_net( before_period , "KOSPI", "개인");
def get_df_period_net_kosdaq_annt( before_period ):
    return get_df_period_net( before_period , "KOSDAQ", "개인");

if __name__== "__main__":
    df1 = get_df_period_net_kospi_annt( before_one_week );
    df2 = get_df_period_net_kospi_annt( before_one_month ); 
    print("weekly pics")
    tabulate_print( df1 )
    print("monthly pics")
    tabulate_print( df2 )
    df3 = pd.merge( df1, df2 , how='inner', on='종목명') 
    df3 = df3[['종목명']]
    print("Keeps")
    tabulate_print( df3 )
