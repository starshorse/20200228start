import pymssql 
import jwt 
import pandas as pd 
import pdb 

ezchemtech_ml_key = { company:'ezchemtech' , source:'excel', id:'richard.choi@ez-office.co.kr' , type: 'Machine' } 
HADES_1_KEY = 'ez-office.co.kr'

encode_jwt =  jwt.encode( ezchemtech_ml_key , HADES_1_KEY, 'HS256' ) 
print('encode key', encode_jwt ) 

decode_ml_key = jwt.decode( encode_jwt , HADES_1_KEY, 'HS256' )
print( ezchemtech_ml_key , decode_ml_key ) 

conn1 = pymssql.connect( server='' , database='' , user='' , password ='' ) 
sql = 'select * from dbo.TB_Auth_Macine' 
df1 = pd.read_sql( sql, con=conn1 ) 


pdb.set_trace() 
