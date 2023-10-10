import pymssql 
import pandas as pd 
import pdb 
import bcrypt 

#conn1 = pymssql.connect( server='34.64.110.64' , database='ezoffice_test' , user='sqlserver' , password ='!csdlwlof#1286' ) 
#sql = 'select * from INFORMATION_SCHEMA.TABLES' 
#df1 = pd.read_sql( sql, con=conn1 ) 

password = '1234'
encoded_password = password.encode('utf-8') 
hashed_password = bcrypt.hashpw( encoded_password, bcrypt.gensalt() ) 
result = bcrypt.checkpw( '1234'.encode('utf-8'), hashed_password )
print( result ) 

pdb.set_trace() 
