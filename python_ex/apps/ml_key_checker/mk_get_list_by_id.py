import pymssql 
import pandas as pd
import pdb 
import sys 
import requests 

from dotenv import load_dotenv
from pathlib import Path 
import os 
#load .env 
dotenv_path = Path('../../../.env')
load_dotenv( dotenv_path = dotenv_path ) 

#
#  argment[0] : company_name 
#  argment[1] : user_id   customer_01@demo.co.kr 
sqlserver_host = os.environ.get('SQLsERVER_HOST')
sqlserver_id = os.environ.get('SQLSERVER_ID') 
sqlserver_password = os.environ.get('SQLSERVER_PASSWORD') 

jupiter_token = os.environ.get('JUPITER_TOKEN') 
#source_select = 'sql_server' 
source_select = 'hades' 
hades_addr_1 ='ezoffice365.com:8000' 
hades_addr_2 ='192.168.0.80:8000' 
hades_addr = hades_addr_1 

print( sqlserver_host )

def get_ml_keys( company_, id_ ):
    headers = {"authentication":f"Bearer {jupiter_token}" } 
#    print( headers )
    df_machine = requests.get(f"http://{hades_addr}/restapi/data/config/Auth_Machine", headers = headers ).json() 
    df_machine = pd.DataFrame( df_machine["ROWS"] ) 
    df_org_auth = requests.get(f"http://{hades_addr}/restapi/data/config/Auth_Organization", headers = headers ).json() 
    df_org_auth = pd.DataFrame( df_org_auth["ROWS"] ) 
    df_org = requests.get(f"http://{hades_addr}/restapi/data/config/Organization", headers = headers ).json() 
    df_org = pd.DataFrame( df_org["ROWS"] ) 
    org_db = df_org.loc[ df_org.orgName == company_ ]['mainDB'].values[0]
    org_seq = df_org.loc[ df_org.orgName == company_ ]['seq'].values[0]
    pdb.set_trace() 
#    
#    df_user = requests.get(f"http://{hades_addr}/restapi/data/{ org_db }/admin_1", headers = headers ).json() 
#    df_user = pd.DataFrame( df_user["ROWS"] ) 
#    org_user_auth_seq = df_user.loc[ df_user.email == id_ ]['seq'].values[0]
    org_user_auth_seq = 1   
    org_auth_seq = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['seq'].values[0]
    org_auth_key = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['authKey'].values[0]
    org_auth_secret = df_org_auth.loc[ df_org_auth.orgSeq == org_seq ]['orgAuthSecret'].values[0]
    df_mk_list = df_machine.loc[ ( df_machine.authOrgSeq == org_auth_seq ) & ( df_machine.authOrgUserSeq == org_user_auth_seq) ]
    print( df_mk_list )
    return df_mk_list.to_json( orient ='records' ) , org_auth_key, org_auth_secret  

def get_ml_keys_sql_server( company_ , id_ ): 
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
    if( source_select == 'sql_server'):    
        get_ml_keys_sql_server( argument[0], argument[1] ) 
    else:
        get_ml_keys( argument[0], argument[1] ) 
    pdb.set_trace()
