from flask import Flask
from codeFApi.database import init_migrate
from codeFApi.commands import usersbp 

app = Flask(__name__)
app.register_blueprint( usersbp )
init_migrate( app )

