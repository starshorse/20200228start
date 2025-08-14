from flask import Flask , g , Response , make_response 
import sqlite3 
import logging 

app = Flask(__name__)
app.config['DATABASE'] = 'sample.db'
app.config.update( DEBUG=True );

def connect_db():
    return sqlite3.connect( app.config['DATABASE'] )

@app.before_request
def before_request():
    g.db = connect_db()
    app.logger.info('before_request') 

@app.after_request
def after_request( response ):
    app.logger.info('after_request') 
    return response 

@app.teardown_request
def teardown_request(exception):
    db = getattr( g ,'db', None )
    if db is not None: 
        db.close()

@app.teardown_appcontext
def teardown_appcontext( exception ):
    app.logger.info('teardown_appcontext') 



@app.route('/')
def custom_response():
    def application( environ , start_response ):
        response_body = 'The request Method : %s' % ( environ['REQUEST_METHOD'] )
        status = '200 OK'
        response_headers = [('Content-Type','text/plain'),('Content-Length', str(len( response_body )))]
        start_response( status , response_headers )
        return [ response_body ]
    return make_response( application )


