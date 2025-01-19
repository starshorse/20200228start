from flask import Flask
from codeFApi.database import init_migrate

app = Flask(__name__)
init_migrate( app )

