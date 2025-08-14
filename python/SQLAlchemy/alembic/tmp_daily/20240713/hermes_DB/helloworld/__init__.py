from flask import Flask , g, Response , make_response 
from helloworld.database import init_db , db_session 

app = Flask(__name__)
db = init_db( app ) 


print( db.metadata ) 


