"""
    using SQLAlchemy\venv2 virtualenv 
    1. flask db init 
    2. flask db migrate -m "Initial migration"

Autogenerating Multiple MetaData collections
The target_metadata collection may also be defined as a sequence if an application has multiple MetaData collections involved:

from myapp.mymodel1 import Model1Base
from myapp.mymodel2 import Model2Base
target_metadata = [Model1Base.metadata, Model2Base.metadata]
The sequence of MetaData collections will be consulted in order during the autogenerate process. Note that each MetaData must contain unique table keys (e.g. the “key” is the combination of the table’s name and schema); if two MetaData objects contain a table with the same schema/name combination, an error is raised.
"""
from flask_sqlalchemy import SQLAlchemy 
from flask_migrate import Migrate 

def init_migrate( app ):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:1234@localhost/ezoffice?driver=ODBC Driver 17 for SQL Server'
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_migrate.db'
    db = SQLAlchemy( app )
    migrate = Migrate( app , db )
    class TB_고객서비스_codeFApi(db.Model):
        __tablename__ = 'TB_고객서비스_codeFApi'
        seq = db.Column(db.Integer, primary_key=True)
        서비스명= db.Column(db.String(120))
        db_name = db.Column(db.String(120))
        enabled = db.Column(db.Integer)
        date = db.Column(db.DateTime)

        def __repr__(self):
             return '<Post: %r>' % (self.title)
    return db 

