from flask import Blueprint 
import click 
from codeFApi.db.init_tables import init_accountTrService 

usersbp = Blueprint('codeFapi', __name__ ) 

@usersbp.cli.command('init_tables')
def init_codeFapi_tables():
    print('init code Fapi tables')
    init_accountTrService() 
