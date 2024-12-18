import pandas as pd
from sqlalchemy import create_engine, MetaData
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
        host="localhost",
        database="config",
        query={"driver": "ODBC Driver 17 for SQL Server"},
        )


engine = create_engine(connection_url)
conn = engine.connect()

#metadata = MetaData( bind= conn, reflect= True )
"""
 sqlalchemy 2.0 insepct 
 inspection = inspect( engine ) 
 inspection.get_tables_names() 

"""
print( engine.table_names() ) 
