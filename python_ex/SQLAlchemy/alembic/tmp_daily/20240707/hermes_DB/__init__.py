from flask import Flask , g , Response , make_response 
from hermes_DB.database import init_DB

app = Flask(__name__)

init_DB( app )




