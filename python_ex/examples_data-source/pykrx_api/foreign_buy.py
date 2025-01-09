from pykrx import stock
import pandas as pd 
from tabulate import tabulate 
from dateutil.relativedelta import relativedelta 
import datetime 


now =  datetime.datetime.now() 
before_one_day = now - relativedelta( days = 1 ) 
before_one_week = now  - relativedelta( weeks = 1 )
before_one_month = now - relativedelta( months = 1 )

def tabulate_print( df ):
    print(tabulate(  df , headers='keys', tablefmt='psql' )) 

def get_df_period( before_period ):
    df = stock.get_market_net_purchases_of_equities( before_period.strftime("%Y%m%d"), before_one_day.strftime("%Y%m%d"), "KOSPI", "외국인")
    df = df.head(50)
    df_1 = pd.read_json('../web_crawling/krx_kspi.json') 

    df_LEFT = pd.merge( df, df_1 , left_on ='티커' , right_on='CODE', how='left')
    df_LEFT = df_LEFT[ ( df_LEFT['PBR'] < 1) & (df_LEFT['PER'] < 20 ) ]
    #df_LEFT =  df_LEFT[['종목명','PER','PBR','DIV']].sort_values(by='PBR').head(50) 
    df_LEFT =  df_LEFT[['종목명','PER','PBR','DIV']].head(50) 
    return df_LEFT 

if __name__== "__main__":
    df1 = get_df_period( before_one_week );
    df2 = get_df_period( before_one_month ); 
    print("weekly pics")
    tabulate_print( df1 )
    print("monthly pics")
    tabulate_print( df2 )
    df3 = pd.merge( df1, df2 , how='inner', on='종목명') 
    df3 = df3[['종목명']]
    print("Keeps")
    tabulate_print( df3 )
