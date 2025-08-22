"""
20241228 - error. 
        (venv) C:\workdir\gitdn\20200228start\python_ex\SQLAlchemy\windows>python py_odbc.py
    Traceback (most recent call last):
      File "py_odbc.py", line 50, in <module>
        print( engine.table_names() )
    AttributeError: 'Engine' object has no attribute 'table_names'

 sqlalchemy==1.4.0 사용 
"""
import pandas as pd
from sqlalchemy import create_engine, MetaData, inspect
from sqlalchemy.engine import URL

connection_string = (
        r"Driver=ODBC Driver 17 for SQL Server;"
        r"Server=(local)\SQLEXPRESS;"
        r"Database=config;"
        r"Trusted_Connection=yes;"
                        )
connection_url = URL.create(
            "mssql+pyodbc", 
            query={"odbc_connect": connection_string}
            )

import sqlalchemy as sa

"""
connection_url = sa.URL.create(
        "mssql+pyodbc",
        username="someuser",
        password="fancy@password",
        host="192.30.0.194",
        database="EPM_Dashboard",
        query={"driver": "SQL Server Native Client 11.0"},
        )
engine = sa.create_engine(connection_url)
"""

connection_url = URL.create(
        "mssql+pyodbc",
        username="sa",
        password="1234",
        host="192.168.0.106",
        database="config",
        query={"driver": "ODBC Driver 17 for SQL Server"},
        )

engine = create_engine(connection_url)

def odbc_conn(): 
    conn = engine.connect()
    return conn 

#metadata = MetaData( bind= conn, reflect= True )
"""
 sqlalchemy 2.0 insepct 
 
"""
inspection = inspect( engine ) 
print(inspection.get_table_names() )

"""
odbc_conn() 
print( engine.table_names() ) 
"""
