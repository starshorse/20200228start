
from  helloworld.pykrx_api._net_buy.common_util import get_market_fundamental_limit_name, get_symbols_code_etf
from  helloworld.pykrx_api._3days_rule._3days_rule import _3days_rule_main_kospi , _3days_rule_main_etf

def _3days_rule_kospi():
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
    _3days_rule_main_kospi( codes_dic, df ) 
    return 


def _3days_rule_etf():
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
    _3days_rule_main_etf( codes_dic, 1 ) 
    return 


def _3days_rule_etf_div():
    df = get_symbols_code_etf()
    df = df[df['종목명'].str.contains('배당')] 
    #print( df );
    codes = df['종목코드'].to_list() 
    names = df['종목명'].to_list() 
    codes_dic = {}
    for key in codes:
        for value in names:
            codes_dic[key] = value
            names.remove(value)
            break 
    _3days_rule_main_etf( codes_dic ) 
    return 
