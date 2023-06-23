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
    os.system('cls' if os.name == 'nt' else 'clear' )
#    sql = "SELECT  t.계좌번호, FORMAT (t.잔액, 'c', 'ko-KR')  as 잔액 , r.마지막거래일시 , t.적요 FROM( SELECT  계좌번호 , MAX(거래일시) as 마지막거래일시 from TB_계좌거래내역_chem group by 계좌번호 ) r INNER JOIN TB_계좌거래내역_chem t ON t.계좌번호 = r.계좌번호 AND t.거래일시 = r.마지막거래일시"
    sql = "select a.계좌번호, b.잔액, a.거래일시, b.적요 FROM ( select Max(seq) as seq, 계좌번호, Max(거래일시) as 거래일시  FROM TB_계좌거래내역_chem group by 계좌번호  )  a  left join TB_계좌거래내역_chem b on  a.seq = b.seq"
    df_period = pd.read_sql( sql , con=conn1 ) 
    print( tabulate(  df_period, headers='keys', tablefmt='psql' )) 
    sql = "select FORMAT( sum(잔액),'c','ko-KR') as  Total from ( select a.계좌번호, b.잔액, a.거래일시, b.적요 FROM ( select Max(seq) as seq, 계좌번호, Max(거래일시) as 거래일시  FROM TB_계좌거래내역_chem group by 계좌번호  )  a  left join TB_계좌거래내역_chem b on  a.seq = b.seq) a"
    df_period = pd.read_sql( sql , con=conn1 ) 
    print( tabulate(  df_period, headers='keys', tablefmt='psql' )) 

job_1()    
schedule.every().hour.do( job_1 )

while True:
    schedule.run_pending()
    time.sleep(1)




