# hello.py
import numpy as np
import json 
from datetime import datetime 
import xlwings as xw
import importlib
common_util = importlib.import_module("pykrx_api.common_util")
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
file_pykrx_pbrperdiv = os.path.join( dir_path, 'pykrx_pbrperdiv.json' )
file_pykrx_pbrperdiv_esr = os.path.join( dir_path, 'pykrx_pbrperdiv_esr.json' )


def read_jsonFile( file_name ):
    with open( file_name, 'r' ) as f:
        json_data = json.load(f)
    print( json.dumps( json_data, indent="\t"))
    return json_data 

def write_jsonFile( file_name , data ):
    with open( file_name, 'w') as make_file:
        json.dump( data, make_file, indent='\t' )

def get_pykrx_pbrperdiv():
   df = common_util.get_market_fundamental_limit_name()
   df = df[['종목코드','종목명','PER','PBR','DIV']].sort_values(by='DIV', ascending = False );
   print(df.head())
   df.to_json( file_pykrx_pbrperdiv , force_ascii= True,  orient= 'records' )
   json_data = read_jsonFile( file_pykrx_pbrperdiv ) 
   esr_f = dict() 
   esr_f['STATUS'] = 1 ;
   esr_f['DATETIME'] = datetime.now().strftime("%Y%m%d");
   esr_f['ROWS'] = json_data
   write_jsonFile( file_pykrx_pbrperdiv_esr , esr_f )
   

def main():
    wb = xw.Book.caller()
    wb.sheets[3]['G3'].value = 'pyKrx Started!'
    get_pykrx_pbrperdiv();
    wb.sheets[3]['G3'].value = 'pyKrx Fishied!'


if __name__=='__main__':
    get_pykrx_pbrperdiv();