from sqlalchemy import create_engine , text, MetaData  , Table , Column , String , Integer, text 
from sqlalchemy.orm import scoped_session , sessionmaker 
from sqlalchemy.ext.declarative import declarative_base 
import sqlalchemy as db  
from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy 


def hs_create_engine( id, password , host , db_name ):
    #return create_engine(f'mssql+pyodbc://{ id }:{ password }@{ host }/{ db_name }?driver=ODBC Driver 17 for SQL Server', echo=True , convert_unicode=True ) 
    return create_engine(f'mssql+pyodbc://{ id }:{ password }@{ host }/{ db_name }?driver=ODBC Driver 17 for SQL Server', echo=True  ) 

def get_table( tbl_name ):
    return Table( tbl_name , metadata , autoload_with = engine ) 

def get_tables_list():
    return engine.table_names()


def init_db():
    import hermes.init_models 
    Base.metadate.create_all( bind = engine ) 

def init_migrate( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC Driver 17 for SQL Server' 
    print( app.config['SQLALCHEMY_DATABASE_URI'] ) 
    """
    import pyodbc 
    conn = pyodbc.connect( app.config['SQLALCHEMY_DATABASE_URI'] )
    """
    db_migrate = SQLAlchemy( app ) 
    #migrate = Migrate( app , db_migrate ) 
    migrate = Migrate()
    migrate.init_app( app, db_migrate ) 
    return db_migrate




metadata = MetaData() 
engine = hs_create_engine( 'sa', '1234', 'localhost', 'ezoffice' ) 
#engine = create_engine('mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC Driver 17 for SQL Server', echo=True , convert_unicode=True )

db_session = scoped_session( sessionmaker( autocommit=False , autoflush=False , bind=engine )) 

BASE = declarative_base()
BASE.query = db_session.query_property()





