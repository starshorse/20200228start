from flask import Blueprint 
import click 


usersbp = Blueprint('codeFapi', __name__ ) 

@usersbp.cli.command('init_tables')
def init_codeFapi_tables():
    print('init code Fapi tables')
