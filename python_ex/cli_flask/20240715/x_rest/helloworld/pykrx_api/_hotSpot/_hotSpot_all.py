import pandas as pd 
from tabulate import tabulate
import json 
import os 
import math, pdb
from helloworld.pykrx_api._3days_rule.stock_data import get_ticker_name , get_df_period , get_df_etf_period, before_one_week, before_two_week 
from  helloworld.pykrx_api._net_buy.common_util import get_market_fundamental_limit_name, get_symbols_code_etf

def _hotSpot_main_kospi( codes_dic, df4div ):
    codes = list( codes_dic.keys() )
    df_all = pd.DataFrame({}); 
    df_all_bear = pd.DataFrame({});
    df_all_bear_div = pd.DataFrame({});
    list_bear = [];
    df = get_df_period( before_two_week, codes[0]);
    df_all.index = df.index ;
    df_all_bear.index = df.index 
    for one in codes:
        print('code:', one );
        df = get_df_period( before_two_week, one )
        if len( df ) == 0:
            continue ;
        #pdb.set_trace(); 
        print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).max() > 5):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  -5 ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
            list_bear.append( one );
    
    print("");
    print("[ over 5% up Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all.tail(3).T) 
    print("");
    print("[ down -5% Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all_bear.tail(3).T) 
    df_all_bear_div['종목코드'] =  list_bear ;
    #print( df4div.head() )
    df_all_bear_div = pd.merge( df_all_bear_div , df4div, on='종목코드', how='left' );
    print( df_all_bear_div );


def _hotSpot_main_etf( codes_dic, max_up = 5 ):
    codes = list( codes_dic.keys() )
    df_all = pd.DataFrame({}); 
    df_all_bear = pd.DataFrame({});
    df = get_df_period( before_two_week, codes[0]);
    df_all.index = df.index ;
    df_all_bear.index = df.index 
    for one in codes:
        df = get_df_etf_period( before_two_week, one )
        if len( df ) == 0:
            continue ;
        #pdb.set_trace(); 
        print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).max() > max_up ):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() < -max_up ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
    
    print("");
    print("[ over 5% up Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all.tail(3).T) 
    print("");
    print("[ down -5% Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all_bear.tail(3).T) 


def _hotSpot_kospi():
    df = get_market_fundamental_limit_name()
    #print( df ); 
    codes = df['종목코드'].to_list() 
    names = df['종목명'].to_list() 
    codes_dic = {}
    for key in codes:
        for value in names:
            codes_dic[key] = value
            names.remove(value)
            break 
    _hotSpot_main_kospi( codes_dic, df ) 
    return 

def _hotSpot_etf():
    df = get_symbols_code_etf()
    searchfor = ['KODEX','TIGER','KOSEF']
    df = df[df['종목명'].str.contains('|'.join(searchfor))] 
    #print( df );
    codes = df['종목코드'].to_list() 
    names = df['종목명'].to_list() 
    codes_dic = {}
    for key in codes:
        for value in names:
            codes_dic[key] = value
            names.remove(value)
            break 
    _hotSpot_main_etf( codes_dic, 5 ) 
    return 
