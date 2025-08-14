from pykrx import stock
import pandas as pd 
from tabulate import tabulate 
from dateutil.relativedelta import relativedelta 
import datetime 
import sys

now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )

def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 

def get_df_period( before_period ):
    if sys.argv[1] == '1':
        df = stock.get_market_net_purchases_of_equities( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), "KOSDAQ", "개인")
    else:    
        df = stock.get_market_net_purchases_of_equities( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), "KOSDAQ", "외국인")
    df = df.head(100)
    print( df )

    df_1 = stock.get_market_fundamental(now.strftime("%Y%m%d"), market="KOSDAQ")
    print( df_1.head(30)) 

    df_LEFT = pd.merge( df, df_1 , on ='티커', how='left')

    df_LEFT = df_LEFT[ ( df_LEFT['PBR'] != 0 ) & (df_LEFT['PER'] != 0 ) ]
    df_LEFT = df_LEFT[ ( df_LEFT['PBR'] < 1) & (df_LEFT['PER'] < 20 ) ]
    df_LEFT =  df_LEFT[['종목명','PER','PBR','DIV']].sort_values(by='PBR').head(50) 
    return df_LEFT 

if __name__ == "__main__":
    df1 = get_df_period( before_one_week );
    df1.sort_index( inplace= True ); 
    df1.reset_index( drop = True ); 
    df2 = get_df_period( before_one_month ); 
    df2.sort_index( inplace= True ); 
    df2.reset_index( drop = True ); 
    print("weekly pics")
    tabulate_print( df1 )
    print("monthly pics")
    tabulate_print( df2 )
    df3 = pd.merge( df1, df2 , how='inner', on='종목명') 
    df3 = df3[['종목명']]
    print("Keeps")
    tabulate_print( df3 )
