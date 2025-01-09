from pykrx import stock
import pandas as pd
from dateutil.relativedelta import relativedelta 
from tabulate import tabulate 
import datetime 
import pdb
codes = [
'000390',
'000720',
'001560',
'001740',
'001780',
'001810',
'003120',
'003410',
'003610',
'005490',
'005820',
'005940',
'007590',
'007770',
'009680',
'010060',
'010950',
'014470',
'016360',
'032560',
'033920',
'034220',
'035250',
'053350',
'055550',
'058860',
'078000',
'092460',
'138070',
'282690',
'456040'
]

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )
def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 

def get_df_period( before_period , code = "005930"):
    df = stock.get_market_ohlcv( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    return df;

def get_3days_rule():
    df_mine = pd.DataFrame( { '종목코드': codes } );
    df_all = pd.DataFrame({}); 
    df = get_df_period( before_one_week, codes[0]);
    df_all.index = df.index ;
    for one in codes:
        df = get_df_period( before_one_week, one )
        #pdb.set_trace(); 
        #print('code:', one );
        print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            one_name = stock.get_market_ticker_name(one) 
            df_all[one_name] = df['등락률']
    print( df_all.tail(3).T) 
    return df_all.tail(3)
"""
    종목의 가격 변동조회 
"""
def get_market_price_change_week():
    df_week = stock.get_market_price_change( before_one_week.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), market="ALL" );
    print( df_week );
    return df_week
def get_market_price_change_month():
    df_month = stock.get_market_price_change( before_one_month.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), market="ALL" );
    print( df_month );
    return df_month
def get_market_price_change_week_mine():
    df_mine = pd.DataFrame({ '종목코드': codes });
    df_week = get_market_price_change_week();
    df_week = df_mine.merge( df_week , how="left" , left_on="종목코드" , right_on="티커" ) 
    df_week.sort_values( by=['등락률'],axis = 0, ascending = False, inplace=True );
    print( df_week );
    return df_week
def get_market_price_change_month_mine():
    df_mine = pd.DataFrame({ '종목코드': codes });
    df_month = get_market_price_change_month();
    df_month = df_mine.merge( df_month , how="left" , left_on="종목코드" , right_on="티커" ) 
    df_month.sort_values( by=['등락률'],axis = 0, ascending = False, inplace=True );
    print( df_month);
    return df_month

if __name__ == '__main__':
    #get_3days_rule();
    get_market_price_change_month_mine();





