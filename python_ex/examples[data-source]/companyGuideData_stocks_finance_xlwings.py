# hello.py
import numpy as np
import json 
from datetime import datetime 
import xlwings as xw
import importlib
common_util = importlib.import_module("f_xls.common_util")
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
file_f_xls_companyguideData = os.path.join( dir_path, 'f_xls_companyguideData.json' )
file_f_xls_companyguideData_esr = os.path.join( dir_path, 'f_xls_companyguideData_esr.json' )


def read_jsonFile( file_name ):
    with open( file_name, 'r' ) as f:
        json_data = json.load(f)
    print( json.dumps( json_data, indent="\t"))
    return json_data 

def write_jsonFile( file_name , data ):
    with open( file_name, 'w') as make_file:
        json.dump( data, make_file, indent='\t' )

def get_f_xls_companyguideData():
   df = common_util.data_companyguide_last()
   print(df.head())
   df.to_json( file_f_xls_companyguideData , force_ascii= True,  orient= 'records' )
   json_data = read_jsonFile( file_f_xls_companyguideData ) 
   esr_f = dict() 
   esr_f['STATUS'] = 1 ;
   esr_f['DATETIME'] = datetime.now().strftime("%Y%m%d");
   esr_f['ROWS'] = json_data
   write_jsonFile( file_f_xls_companyguideData_esr , esr_f )
   

def main():
    wb = xw.Book.caller()
    wb.sheets[4]['G3'].value = 'pyKrx Started!'
    get_f_xls_companyguideData();
    wb.sheets[4]['G3'].value = 'pyKrx Fishied!'


if __name__=='__main__':
    get_f_xls_companyguideData();
