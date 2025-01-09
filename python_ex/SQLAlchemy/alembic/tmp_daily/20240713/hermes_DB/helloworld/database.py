from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import create_engine 
from sqlalchemy.orm import scoped_session , sessionmaker 


connection_uri = 'mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC Driver 17 for SQL Server'

engine = create_engine( connection_uri , echo=True ) 
db_session = scoped_session( sessionmaker ( autocommit = False , autoflush=False , bind=engine )) 


def init_db( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = connection_uri ;
    db = SQLAlchemy( app );
    migrate = Migrate( app , db );
    return db 
    
