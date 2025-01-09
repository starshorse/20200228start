from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy import create_engine 
from sqlalchemy.orm import scoped_session , sessionmaker 
from sqlalchemy.ext.declarative import declarative_base 

connection_uri = 'mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC Driver 17 for SQL Server' 

#engine = create_engine( connection_uri , echo=True , convert_unicode=True )
engine = create_engine( connection_uri , echo=True )

db_session = scoped_session( sessionmaker( autocommit=False , autoflush=False , bind=engine )) 
Base = declarative_base()
Base.query = db_session.query_property() 
db = None ;

def init_DB_Base():
    Base.metadata.create_all( bind=engine ) 

def init_DB( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = connection_uri 
    migrate = Migrate()
    db = SQLAlchemy( app )
    migrate.init_app( app , db )


