import pymssql 
import pandas as pd
import pdb 
import sys 
import schedule
import datetime 
import time 
from tabulate import tabulate 
import os 
#
sqlserver_host = '' 
sqlserver_id  = ''
sqlserver_password = ''  

sql_state_g = [] 
cur_cnt = 0

def set_db_info( isqlserver_host, isqlserver_id , isqlserver_password ):
    global sqlserver_host , sqlserver_id , sqlserver_password
    sqlserver_host = isqlserver_host ;
    sqlserver_id = isqlserver_id;
    sqlserver_password = isqlserver_password ;

def job_sql():
    global sql_state_g , cur_cnt 
    os.system('cls' if os.name == 'nt' else 'clear' )
    for sql_state in sql_state_g: 
        conn1 = pymssql.connect( server= sqlserver_host ,user = sqlserver_id , password = sqlserver_password , database = 'ezchemtech' ) 
        df_period = pd.read_sql( sql_state , con=conn1 ) 
        print( tabulate(  df_period, headers='keys', tablefmt='psql' )) 
    print('cur time:', datetime.datetime.now() )
    cur_cnt += 1;
    print('cur_cycle:', cur_cnt ) 

def job_sql_schedule( sql_states ):
    global sql_state_g 
    sql_state_g = sql_states 
    job_sql() 
    schedule.every().hour.do( job_sql )
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    sqls = [] 
    sql = 'SELECT a.담당자1, a.업무명, b.세부내용, a.완료시한, a.완료일 from TB_정기업무수행대상목록 a inner join  TB_정기업무기본정보 b on a.업무id = b.seq  WHERE YEAR(a.완료시한) = YEAR(GETDATE()) AND MONTH(a.완료시한) = MONTH(GETDATE());'
    sqls.append( sql ) 
    job_sql_schedule( sqls ) 


