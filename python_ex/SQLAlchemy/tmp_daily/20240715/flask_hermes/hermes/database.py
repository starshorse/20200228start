from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 

def init_migrate( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:1234@localhost/config?driver=ODBC Driver 17 for SQL Server'
    db = SQLAlchemy( app )
    migrate = Migrate()
    migrate.init_app( app , db ) 
    return db 

