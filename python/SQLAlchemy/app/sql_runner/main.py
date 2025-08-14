from sqlalchemy import text 
from py_odbc import odbc_conn 

conn = odbc_conn()

sql = text('select * from TB_Admin')
result = conn.execute( sql )
#data = [ row[0] for row in result ]
data = [ dict( r.items() ) for r in result ]

print( data )

for r in result:
    print( r.__dict__ )
    r_dict = dict(r.items())
    print( r_dict )
