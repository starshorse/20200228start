from pykrx import stock
from dateutil.relativedelta import relativedelta 
import datetime 
import pdb

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_two_week = now  - relativedelta( weeks = 2 )
before_one_month = now - relativedelta( months = 1 )
def get_df_period( before_period , code = "005930"):
    df = stock.get_market_ohlcv( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    return df;

def get_df_etf_period( before_period , code = "200250"):
    df = stock.get_etf_ohlcv_by_date( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    if len( df ) > 0:
        df['등락률'] = df['종가'].pct_change().fillna(0)*100;
    return df;

def get_ticker_name( code ):
    ticker = stock.get_market_ticker_name( code ); 
    print(code);
    print(ticker);
    return ticker ;
