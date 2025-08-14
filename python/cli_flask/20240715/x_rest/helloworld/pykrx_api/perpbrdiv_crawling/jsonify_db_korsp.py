import sys, os 
sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
import my_pandas as pandas
import my_schedule as schedule 
import pdb
import datetime 
import time 
"""
    merge_pykrx( df ) 
"""
import naver_stocks_01 as naver_stock 
import korsp_106_pykrx as pykrx 

def getNaver_stock_db():
    print('crawling naver _start_');
    naver_stock.getKSP_stock_data()
    time.sleep(5) 
    print('inset to json file_start_');
    df = pandas.read_json("krx_kspi.json")      
    df = pandas.fillna( df , "-" )
    print( df.head(10) )
#    pdb.set_trace();
    print('inset to db_start_');
    pykrx.merge_pykrx( df ); 
    print("pykrx merge done"); 
    pykrx.merge_pykrx_time( df ); 
    print("cur time:", datetime.datetime.now())


if __name__ == "__main__":
    getNaver_stock_db();
    schedule.schedule_every_x_hours( getNaver_stock_db , 5 ); 

