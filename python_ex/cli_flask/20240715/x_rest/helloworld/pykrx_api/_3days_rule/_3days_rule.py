import pandas as pd 
import json 
import os 
import math, pdb
from tabulate import tabulate
from .stock_data import get_ticker_name , get_df_period , get_df_etf_period, before_one_week, before_two_week 
from .code_name import  codes_dic , etf_codes_dic
from  helloworld.pykrx_api._net_buy.common_util import get_market_fundamental_limit_name, get_symbols_code_etf

def get_tickers( group_name ):
    with open( os.path.join( os.path.dirname( os.path.realpath(__file__)), f'{ group_name }.json' ),'rt', encoding='UTF8') as f:
        tickers = json.load(f);
        print( tickers );
    return tickers;    

def add_ticker( group_name , code ):
    tickers = get_tickers( group_name );
    tickers[code] = get_ticker_name( code );
    with open( os.path.join( os.path.dirname( os.path.realpath(__file__)), f'{ group_name }.json' ),'w', encoding='UTF8') as f:
        json.dump( tickers, f, indent=2);

def _3days_rule_group( group_name ):
    #df_mine = pd.DataFrame( { '종목코드': codes } );
    codes_dic = get_tickers( group_name ); 
    codes = list( codes_dic.keys() )
    df_all = pd.DataFrame({}); 
    df_all_bear = pd.DataFrame({});
    df = get_df_period( before_two_week, codes[0]);
    df_all.index = df.index ;
    df_all_bear.index = df.index 
    for one in codes:
        df = get_df_period( before_two_week, one )
        #pdb.set_trace(); 
        print('code:', one );
        #print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  0 ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
    print("");
    print("[ 3 days bull up Stocks ]")
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all.tail(3).T) 
    print("");
    print("[ 3 days bear down Stocks ]")
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all_bear.tail(3).T) 

def _3days_rule_main():
    #df_mine = pd.DataFrame( { '종목코드': codes } );
    codes = list( codes_dic.keys() )
    etf_codes = list( etf_codes_dic.keys() )
    df_all = pd.DataFrame({}); 
    df_all_bear = pd.DataFrame({});
    df_all_bear_div = pd.DataFrame({});
    df = get_df_period( before_two_week, codes[0]);
    df_all.index = df.index ;
    df_all_bear.index = df.index 
    df4div  = get_market_fundamental_limit_name();
    list_bear = [];
    for one in codes:
        df = get_df_period( before_two_week, one )
        if len( df ) == 0:
            continue ;
        #pdb.set_trace(); 
        print('code:', one );
        #print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  0 ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
            list_bear.append( one );
    for one in etf_codes:
        df = get_df_etf_period( before_two_week, one )
        if len( df ) == 0:
            continue ;
        #pdb.set_trace(); 
        print('code:', one );
        #print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 ):
            df_all[ etf_codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  0 ):
            df_all_bear[ etf_codes_dic[ one ] ] = df['등락률'] 
    
    print("");
    print("[ 3 days bull up Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all.tail(3).T) 
    print("");
    print("[ 3 days bear down Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all_bear.tail(3).T) 
    df_all_bear_div['종목코드'] =  list_bear ;
    #print( df4div.head() )
    df_all_bear_div = pd.merge( df_all_bear_div , df4div, on='종목코드', how='left' );
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all_bear_div.sort_values(by='종목명', ascending=False ));


def _3days_rule_main_kospi( codes_dic, df4div ):
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
        #print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 and df['등락률'].tail(3).max() > 2):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  0 ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
            list_bear.append( one );
    
    print("");
    print("[ 3 days bull up Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all.tail(3).T) 
    print("");
    print("[ 3 days bear down Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all_bear.tail(3).T) 
    df_all_bear_div['종목코드'] =  list_bear ;
    #print( df4div.head() )
    df_all_bear_div = pd.merge( df_all_bear_div , df4div, on='종목코드', how='left' );
    print( df_all_bear_div );
    with pd.option_context('display.max_rows', None, 'display.max_columns', None):  # more options can be specified also
        print( df_all_bear_div[ df_all_bear_div['DIV'] > 5.5 ]);


def _3days_rule_main_etf( codes_dic, max_up = 0 ):
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
        #print(df['등락률'].tail(3))
        if( df['등락률'].tail(3).min() >  0 and df['등락률'].tail(3).max() > max_up ):
            df_all[ codes_dic[ one ] ] = df['등락률'] 
        if( df['등락률'].tail(3).max() <  0 ):
            df_all_bear[ codes_dic[ one ] ] = df['등락률'] 
    
    print("");
    print("[ 3 days bull up Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all.tail(3).T) 
    print("");
    print("[ 3 days bear down Stocks ]")
    #print( tabulate( df_all.tail(3).T , headers='keys' , tablefmt='psql' )) 
    print( df_all_bear.tail(3).T) 

if __name__ == '__main__':
    _3days_rule_main();





