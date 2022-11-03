import pymssql 
import pandas as pd
import pdb 
import sys 
from dotenv import load_dotenv
from pathlib import Path 
import os 
#load .env 
dotenv_path = Path('../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

#
#  argment[0] : company_name 
#  argment[1] : user_id   customer_01@demo.co.kr 
sqlserver_host = os.environ.get('SQLsERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

print( sqlserver_host )

def get_ml_keys( company_ , id_ ): 
    conn1 = pymssql.connect( server= sqlserver_host ,user = sqlserver_id , password = sqlserver_password , database = 'ezchemtech' ) 
    sql = 'select * from config.dbo.TB_Auth_Machine' 
    df_machine = pd.read_sql( sql , con=conn1 ) 
    sql = 'select * from config.dbo.TB_Auth_Organization'
    df_org_auth = pd.read_sql( sql , con=conn1 ) 
    sql = 'select * from config.dbo.TB_Organization'
    df_org = pd.read_sql( sql , con=conn1 ) 
    org_db = df_org.loc[ df_org.orgName == company_ ]['mainDB'].values[0]
    org_seq = df_org.loc[ df_org.orgName == company_ ]['seq'].values[0]
    sql = f"select * from { org_db }.dbo.TB_admin_1 where email = '{ id_ }'" 
    print( sql) 
    df_user = pd.read_sql( sql , con=conn1 ) 
    org_user_auth_seq = df_user['seq'].values[0]  
    org_auth_seq = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['seq'].values[0]
    org_auth_key = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['authKey'].values[0]
    org_auth_secret = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['orgAuthSecret'].values[0]
    df_mk_list = df_machine.loc[ ( df_machine.authOrgSeq == org_auth_seq ) & ( df_machine.authOrgUserSeq == org_user_auth_seq) ]
    print( df_mk_list )
    return df_mk_list.to_json( orient ='records' ) , org_auth_key, org_auth_secret  

if __name__ == '__main__':
    argument = sys.argv 
    del argument[0] 
    print(f'Argument: { argument }') 
    if len( argument ) != 2:
        print('need arguement i.e: mk_get_list_by_id.py demo customer_01@demo.co.kr' ) 
        quit()     
    get_ml_keys( argument[0], argument[1] ) 
    pdb.set_trace()
