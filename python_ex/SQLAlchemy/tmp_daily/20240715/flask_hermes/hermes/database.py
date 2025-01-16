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
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:1234@localhost/config?driver=ODBC Driver 17 for SQL Server'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_migrate.db'
    db = SQLAlchemy( app )
    migrate = Migrate()
    migrate.init_app( app , db ) 
    """
    from hermes.init_models import init_models
    init_models(db)
    """
    class Post(db.Model):
        __tablename__ = 'blogposts'

        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(120))
        content = db.Column(db.Text)
        date = db.Column(db.DateTime)
        tag = db.Column(db.String(120))
        cover = db.Column(db.String(120))

        def __repr__(self):
             return '<Post: %r>' % (self.title)
    return db 

