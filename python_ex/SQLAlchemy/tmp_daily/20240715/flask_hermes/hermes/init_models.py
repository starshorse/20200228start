from sqlalchemy import BigInteger, Column, Date, Integer, Numeric, PrimaryKeyConstraint, Table, Unicode, String 
from sqlalchemy.orm import Mapped, declarative_base, mapped_column
from sqlalchemy.orm.base import Mapped

Base = declarative_base()
metadata = Base.metadata


class User( Base ):
    __tablename__ = 'TB_User'
    id = Column( Integer, primary_key=True )
    name = Column( String(128)) 

def init_models( db ):
    """
    class User( db.Model ):
        id = db.Column( db.Integer, primary_key=True )
        name = db.Column( db.String(128)) 
    """    
    class Post(db.Model):
        __tablename__ = 'blogposts'

        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(120))
        content = db.Column(db.Text)
        owner = db.Column( db.String(120))
        date = db.Column(db.DateTime)
        tag = db.Column(db.String(120))
        cover = db.Column(db.String(120))

        def __repr__(self):
             return '<Post: %r>' % (self.title)
