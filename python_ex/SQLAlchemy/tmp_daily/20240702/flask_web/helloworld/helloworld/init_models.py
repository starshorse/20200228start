from helloworld.database import Base 
from sqlalchemy import  Column , String ,Text , Integer 


class Board( Base ):
    __tablename__ = 'TB_Board'
    seq = Column( Integer , primary_key=True )
    title = Column( String(50) , unique=True )
    content = Column( String )
    ownerSeq = Column( Integer ) 
    def __init__( self , title=None , ownerSeq=None ):
        self.title = title 
        self.ownerSeq = ownerSeq 
    def __repr__( self ):
        return '<Board %r>' % ( self.title , ) 
