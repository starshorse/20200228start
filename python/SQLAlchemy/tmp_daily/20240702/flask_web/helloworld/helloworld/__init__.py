from flask import Flask , g , Response , make_response  
import sqlite3 
import logging 
from werkzeug.routing import BaseConverter 
from helloworld.database import db_session 
from helloworld.init_models import Board 


def create_app():
    return Flask(__name__) 

app = create_app() 
app.config['DATABASE'] = 'sample.db'
app.config.update( DEBUG=True )

class BoardView( BaseConverter ):
    def to_python( self, value ):
        record = db_session.query( Board ).filter( Board.seq == '1' ).first() 
        return record 
    def to_url( self , record):
        return record.seq   

app.url_map.converters['board'] = BoardView

@app.route('/boards/<board:record>', endpoint='view' )
def board_view_url( record ):
    return  'record:seq %d , record:title %s , record: content %s' % ( record.seq , record.title, record.content )


