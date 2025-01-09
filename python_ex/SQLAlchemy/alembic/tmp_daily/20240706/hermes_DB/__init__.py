from flask import Flask 
from hermes_DB.database import init_db

app = Flask(__name__)
init_db(app)

