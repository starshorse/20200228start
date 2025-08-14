import sys, os 
from dotenv import load_dotenv
from pathlib import Path 
#dotenv_path = Path('../../../../.env')
dotenv_path = Path('/home/rrr/workdir/tmp/.env')
load_dotenv( dotenv_path = dotenv_path ) 
sys.path.append('/home/rrr/workdir/tmp/python_ex/modules' ) 
import my_pymssql as pymssql  
import my_pandas as pandas

sqlserver_host = os.environ.get('SQLSERVER_HOST_1')
sqlserver_id = os.environ.get('SQLSERVER_ID_1') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD_1') 
sqlserver_database = 'KORSP'

sql_1 = 'select * from [dbo].[유가증권_상장사목록]'
market_1 = '[dbo].[유가증권_상장사목록]';
market_2 = '[dbo].[코스닥_상장사목록]';


def get_connect():
    conn = pymssql.connect( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password )
    return conn; 
    

def merge_stocklist( dataFrame , tbl_name = market_1 ):
    conn = pymssql.connect( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password )

    for index, row in dataFrame.iterrows():
        종목코드= row['종목코드']; 
        업종 = row['업종']; 
        주요제품 = row['주요제품']; 
        상장일 = row['상장일']; 
        회사명 = row['회사명'];
        결산월  = row['결산월'];
        대표자명 = row['대표자명'];
        홈페이지 = row['홈페이지'];
        지역 = row['지역'];
        sql_state = f''' 
        merge into { tbl_name } AS T
        using ( select 종목코드='{ 종목코드 }', 회사명='{ 회사명 }', 주요제품 = '{ 주요제품 }' , 업종='{ 업종 }' ,  상장일 = '{ 상장일 }', 결산월 ='{ 결산월 }', 일자= getdate(),
        대표자명 = '{ 대표자명 }',
        홈페이지 = '{ 홈페이지 }',
        지역 = '{ 지역 }')
        AS S on ( T.종목코드 = S.종목코드)
        when matched then
              update set T.회사명 = S.회사명 , T.주요제품 = S.주요제품 , T.업종 = S.업종 , T.상장일 = S.상장일, T.결산월 = S.결산월,
        T.대표자명 = S.대표자명,      
        T.홈페이지 = S.홈페이지,      
        T.지역 = S.지역      
        when not matched then
              insert( 종목코드, 회사명,결산월, 주요제품, 업종 , 상장일,
              대표자명, 홈페이지, 지역 
              )  values( S.종목코드, S.회사명,S.결산월 , S.주요제품, S.업종 , S.상장일,
              S.대표자명, S.홈페이지 , S.지역 
              ) ;
        '''      
        try:
            cursor = pymssql.execute( conn, sql_state ) 
        except  Exception as e:
            print(e);
            print(sql_state);
    return conn 


def show_result( conn ):
    df = pandas.read_sql( sql_1, conn ) 
    print( df_head(10) )
    return df 

if __name__ =='__main__':
    conn = get_connect(); 
    df = pandas.read_sql( sql_1, conn )
    print( df.head(10) )
    
