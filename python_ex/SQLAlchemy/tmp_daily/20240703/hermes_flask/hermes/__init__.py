from flask import Flask , jsonify , Response 
import logging, os ,json  
from dotenv import load_dotenv 
from werkzeug.routing import BaseConverter 
from hermes.database import db_session, get_table, get_tables_list  
from hermes.database import init_migrate 
from hermes.codeFApi_utils import request_token

app = Flask(__name__)
app.config.update( DEBUG=True ) 
db_migrate = init_migrate( app ) 


BASE_DIR = os.path.dirname( os.path.abspath(__file__)) 
load_dotenv( os.path.join( BASE_DIR , "../.env" ));

app.config['CF_CLIENT_ID'] = os.environ['CF_CLIENT_ID'] 
app.config['CF_CLIENT_SECRET'] =  os.environ['CF_CLIENT_SECRET'] 


class TableView( BaseConverter ):
    def to_python( self , value ):
        Table = get_table( value )
        record = db_session.query( Table ).all() 
        return record 
    def to_url( self, record ):
        return 'done' 

app.url_map.converters['table_data'] = TableView 


@app.route('/')
def helloworld():
    app.logger.info('Welcome !')
    return 'Welcome to Hermes_flask'


@app.route('/token')
def get_token():
    app.logger.info( app.config['CF_CLIENT_ID'] )
    return request_token( app.config['CF_CLIENT_ID'] , app.config['CF_CLIENT_SECRET'] )


@app.route('/tables')
def tables_list():
    return jsonify( get_tables_list() )

@app.route('/table/data/<table_data:record>', endpoint='view')
def table_view_url(record):
    print( record )
    record = [ tuple( row ) for row in record ]
    return  Response( json.dumps( record ) , mimetype = 'application/json' ) 
