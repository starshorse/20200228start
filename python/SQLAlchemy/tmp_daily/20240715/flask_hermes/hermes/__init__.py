from flask import Flask 
from hermes.database import init_migrate

app = Flask(__name__)

init_migrate( app )




