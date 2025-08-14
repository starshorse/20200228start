from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy 

db = None 

def init_db( app ):
    global db ;
    migrate = Migrate()
    app.config['SQLALCHEMY_DATABASE_URI'] ='mssql+pyodbc://sa:1234@localhost/KORSP?driver=ODBC Driver 17 for SQL Server'
    db = SQLAlchemy( app )
    migrate.init_app( app, db ) 
    import hermes_DB.KORSP_models


