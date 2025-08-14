import sys, os 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb
from datetime import datetime
import json 

dir_path = os.path.dirname(os.path.realpath(__file__))
module_dir = os.path.normpath( os.path.join( dir_path ,'..\\..\\modules') )
pykrxApi_dir = os.path.normpath( os.path.join( dir_path ,'..\\pykrx_api') )

file_fn_debt_pbrperdiv = os.path.join( dir_path, 'fn_debt_pbrperdiv.json' )
file_fn_debt_pbrperdiv_esr = os.path.join( dir_path, 'fn_debt_pbrperdiv_esr.json' )

# If os is ubuntu.. 
#sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
#sys.path.append("C:\\workdir\\gitdn\\20200228start\\python_ex\\modules") 
sys.path.append( module_dir )
sys.path.append( pykrxApi_dir )
print( sys.path )
#from modules import selenium
import my_selenium as selenium 
import common_util

part_rank = 'https://comp.fnguide.com/SVO2/ASP/SVD_UJRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=301&stkGb='
indicator_rank = 'https://comp.fnguide.com/SVO2/ASP/SVD_idxRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=302&stkGb='

def read_jsonFile( file_name ):
    with open( file_name, 'r' ) as f:
        json_data = json.load(f)
    print( json.dumps( json_data, indent="\t"))
    return json_data 

def write_jsonFile( file_name , data ):
    with open( file_name, 'w') as make_file:
        json.dump( data, make_file, indent='\t' )

def get_dataTable( url ):
    driver = selenium.getDriver()
    selenium.get( url )
    html = driver.page_source 
    soup = BeautifulSoup( html ) 
    table = pd.read_html(str(soup), flavor="bs4")
    #print(table[0]);
    df = common_util.get_market_fundamental_limit_name()
    df = df[['종목코드','종목명']].sort_values(by='종목명', ascending = False );
    df_guide = df.merge( table[0], how='inner' , left_on='종목명', right_on='종목명' )
    print( df_guide )
    df_guide.to_json( file_fn_debt_pbrperdiv , orient ='records' )
    json_data  = read_jsonFile( file_fn_debt_pbrperdiv )

    esr_f = dict() 
    esr_f['STATUS'] = 1 ;
    esr_f['DATETIME'] = datetime.now().strftime("%Y%m%d");
    esr_f['ROWS'] = json_data 
    write_jsonFile( file_fn_debt_pbrperdiv_esr , esr_f )
    json_data  = read_jsonFile( file_fn_debt_pbrperdiv_esr )

    return df_guide  


if __name__=='__main__':
    get_dataTable( indicator_rank );
