from pykrx import stock
import pandas as pd
from dateutil.relativedelta import relativedelta 
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
'456040',
'329180'
]

etf_codes = [
  '237350' , # KOSPI 100 
  '130680' , # Oil 
  '169950' , # china A50 
  '200250' , # Indo 50
  '292560' , # Yen 
  '409810' , # Nsdaq 100 
]

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )
def get_df_period( before_period , code = "005930"):
    df = stock.get_market_ohlcv( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    return df;

def get_df_etf_period( before_period , code = "200250"):
    df = stock.get_etf_ohlcv_by_date( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), code );
    df['등락률'] = df['종가'].pct_change().fillna(0)*100;
    return df;

if __name__ == '__main__':
    #df_mine = pd.DataFrame( { '종목코드': codes } );
    df_all = pd.DataFrame({}); 
    df = get_df_period( before_one_week, codes[0]);
    df_all.index = df.index ;
    for one in codes:
        df = get_df_period( before_one_week, one )
        #pdb.set_trace(); 
        print('code:', one );
        print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            one_name = stock.get_market_ticker_name(one) 
            df_all[one_name] = df['등락률']

    for one in etf_codes:
        df = get_df_etf_period( before_one_week, one )
        #pdb.set_trace(); 
        print('code:', one );
        print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            one_name = stock.get_etf_ticker_name(one) 
            df_all[one_name] = df['등락률']
    
    print( df_all.tail(3).T) 





