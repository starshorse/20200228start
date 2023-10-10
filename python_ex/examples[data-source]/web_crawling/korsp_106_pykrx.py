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

sql_1 = 'select * from [property].[pykrx]'

def normalize_ratio( data ):
    str_data = str( data )
    strs = str_data.split('.') 
    if(len(strs) >1 and len(strs[1]) > 2 ):
        try:
            strs[1] = strs[1][0:2] ;
        except Exception as e:
            print(e) 
        str_data = '.'.join( strs )
    return str_data ; 

def merge_pykrx( dataFrame = {} ):
    conn = pymssql.connect( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password )

    for index, row in dataFrame.iterrows():
        CODE= row['CODE']; 
        PBR = normalize_ratio( row['PBR']) ; 
        PER = normalize_ratio( row['PER']); 
        DIV = normalize_ratio( row['DIV']) ; 
        NAME = row['NAME']
        sql_state = f''' 
        merge into [property].[pykrx] AS T
        using ( select 종목코드='{ CODE }', 종목명='{ NAME }', PER = '{ PER }' , PBR='{ PBR }' ,  배당수익률 = '{ DIV }', 일자= getdate()) AS S on ( T.종목코드 = S.종목코드)
        when matched then
              update set T.종목명 = S.종목명 , T.PER = S.PER , T.PBR = S.PBR , T.배당수익률 = S.배당수익률, T.일자 = S.일자
        when not matched then
              insert( 일자,종목코드, 종목명,관리여부, PER, PBR , 배당수익률 )  values( S.일자,S.종목코드, S.종목명,'-', S.PER, S.PBR , S.배당수익률 ) ;
        '''      
        try:
            cursor = pymssql.execute( conn, sql_state ) 
        except  Exception as e:
            print(sql_state);
    return conn 

def merge_pykrx_time( dataFrame = {} ):
    conn = pymssql.connect( sqlserver_host , sqlserver_database, sqlserver_id , sqlserver_password )

    for index, row in dataFrame.iterrows():
        CODE= row['CODE']; 
        PBR = normalize_ratio( row['PBR']) ; 
        PER = normalize_ratio( row['PER']); 
        DIV = normalize_ratio( row['DIV']) ; 
        NAME = row['NAME']
        sql_state = f''' 
        merge into [property].[pykrx_time] AS T
        using ( select 종목코드='{ CODE }', 종목명='{ NAME }', PER = '{ PER }' , PBR='{ PBR }' ,  배당수익률 = '{ DIV }', 일자= getdate()) AS S on ( T.종목코드 = S.종목코드 and T.일자 = S.일자)
        when matched then
              update set T.종목명 = S.종목명 , T.PER = S.PER , T.PBR = S.PBR , T.배당수익률 = S.배당수익률, T.일자 = S.일자
        when not matched then
              insert( 일자,종목코드, 종목명,관리여부, PER, PBR , 배당수익률 )  values( S.일자,S.종목코드, S.종목명,'-', S.PER, S.PBR , S.배당수익률 ) ;
        '''      
        try:
            cursor = pymssql.execute( conn, sql_state ) 
        except  Exception as e:
            print(sql_state);
    return conn 

def show_result( conn ):
    df = pandas.read_sql( sql_1, conn ) 
    print( df_head(10) )
    return df 

if __name__ =='__main__':
    conn = merge_pykrx(); 
#    row = curs.fetchall()
    df = pandas.read_sql( sql_1, conn )
    print( df.head(10) )
    
