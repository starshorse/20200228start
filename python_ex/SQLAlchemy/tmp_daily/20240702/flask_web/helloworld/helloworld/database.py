from sqlalchemy import create_engine 
from sqlalchemy.orm import scoped_session, sessionmaker 
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('mssql+pymssql://sa:1234@192.168.0.106/ezoffice', echo=True , convert_unicode=True )

db_session = scoped_session( sessionmaker( autocommit=False , autoflush=False , bind=engine ) )

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import helloworld.init_models 
    Base.metadata.create_all( bind = engine ) 

