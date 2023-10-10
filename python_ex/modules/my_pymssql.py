import pymssql 

server =''
database =''
user ='' 
password= ''

def connect( sqlserver_host, sql_database, sqlserver_id , sqlserver_password ):
    global server , database , user, password 
    server =sqlserver_host ;
    database = sql_database ;
    user = sqlserver_id ;
    password = sqlserver_password ; 
    return pymssql.connect( server = server ,database = database , user = user , password =  password ) 

def execute( conn, sql ):
    cursor = conn.cursor()
    cursor.execute( sql )
    conn.commit() 
    return cursor 

def close( conn ):
    conn.close() 
