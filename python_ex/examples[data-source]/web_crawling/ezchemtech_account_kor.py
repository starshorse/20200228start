import sys, os 
from dotenv import load_dotenv
from pathlib import Path 
import datetime 
dotenv_path = Path('/home/rrr/workdir/gitdn/20200228start/python_ex/.env')
load_dotenv( dotenv_path = dotenv_path ) 
sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
import my_pymssql as pymssql  
import my_pandas as pandas
import my_schedule as schedule 

sqlserver_host = os.environ.get('SQLSERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 
sqlserver_database = 'ezchemtech'

sqlserver_host_t = os.environ.get('SQLSERVER_HOST_1')
sqlserver_id_t = os.environ.get('SQLSERVER_ID_1') 
sqlserver_password_t = os.environ.get('SQLSERVER_PASSWORD_1') 
sqlserver_database_t = 'ezchemtech'

def getDataFromDB( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password, sql_state ):
    print( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password, sql_state )
    conn = pymssql.connect( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password )
    return pandas.read_sql( sql_state, conn )

def merge_account_time( sql_state ):
    conn = pymssql.connect( sqlserver_host_t , sqlserver_database_t, sqlserver_id_t , sqlserver_password_t )
    try:
        cursor = pymssql.execute( conn, sql_state ) 
    except  Exception as e:
        print(sql_state);
    return conn.close()  

def updateDB_mine():
    sql_state = "select a.계좌번호, b.잔액, a.거래일시, b.적요 FROM ( select Max(seq) as seq, 계좌번호, Max(거래일시) as 거래일시  FROM TB_계좌거래내역_chem group by 계좌번호  )  a  left join TB_계좌거래내역_chem b on  a.seq = b.seq;"
    df = getDataFromDB( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password, sql_state ); 
    print( df ); 
    for index, row in df.iterrows():
        account_id= row['계좌번호']; 
        remains  =  row['잔액'] ; 
        transaction_time  = row['거래일시']; 
        memo =  row['적요'] ; 
        sql_state = f''' 
        merge into account_status AS T
        using ( select 계좌번호='{ account_id  }', 잔액 ='{ remains }', 거래일시  = '{ transaction_time }' , 적요 ='{ memo }' , updateDate = getDate()) AS S on ( T.계좌번호 = S.계좌번호 and T.거래일시 = S.거래일시 )
        when matched then
              update set T.잔액 = S.잔액, T.적요 = S.적요,T.updateDate = S.updateDate 
        when not matched then
              insert( 계좌번호,잔액, 거래일시,적요, updateDate )  values( S.계좌번호,S.잔액, S.거래일시,S.적요, S.updateDate ) ;
        '''      
        merge_account_time( sql_state ); 
    print("cur time:", datetime.datetime.now())

    
if __name__ == '__main__':
    updateDB_mine();
    schedule.schedule_every_x_hours( updateDB_mine , 6 ); 
    



