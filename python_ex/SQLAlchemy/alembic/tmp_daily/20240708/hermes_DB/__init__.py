from flask import Flask , g , Response , make_response 
from hermes_DB.database import init_db

app = Flask(__name__) 

db = init_db( app ) 
