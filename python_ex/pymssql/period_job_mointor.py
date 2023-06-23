import pymssql 
import pandas as pd
import pdb 
import sys 
import schedule
import time 
from dotenv import load_dotenv
from pathlib import Path 
from tabulate import tabulate 
import os 
#load .env 
dotenv_path = Path('../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

#
#  argment[0] : company_name 
#  argment[1] : user_id   customer_01@demo.co.kr 
sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

if __name__ == '__main__':
    argument = sys.argv 
    del argument[0] 
    print(f'Argument: { argument }') 

#if len( argument ) != 2:
#    print('need arguement i.e: mk_get_list_by_id.py demo customer_01@demo.co.kr' ) 
#    quit()     

def job_1():
    conn1 = pymssql.connect( server= sqlserver_host ,user = sqlserver_id , password = sqlserver_password , database = 'ezchemtech' ) 
    sql = 'SELECT a.담당자1, a.업무명, b.세부내용, a.완료시한, a.완료일 from TB_정기업무수행대상목록 a inner join  TB_정기업무기본정보 b on a.업무id = b.seq  WHERE YEAR(a.완료시한) = YEAR(GETDATE()) AND MONTH(a.완료시한) = MONTH(GETDATE());'
    df_period = pd.read_sql( sql , con=conn1 ) 
    os.system('cls' if os.name == 'nt' else 'clear' )
    print( tabulate(  df_period, headers='keys', tablefmt='psql' )) 

schedule.every().hour.do( job_1 )

while True:
    schedule.run_pending()
    time.sleep(1)




