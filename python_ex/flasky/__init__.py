from flask import Flask 
from flask_bootstrap import Bootstrap 
from flask_mail import Mail
from flask_moment import Moment 
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager 
from flask_pagedown import PageDown 
# from config import config 
from flask_sslify import SSLify 

def create_app( config_name):
    app = Flask(__name__)
    return app 
