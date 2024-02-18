import os
from dotenv import load_dotenv
from flask_migrate import Migrate , upgrade
from flasky import create_app 


app = create_app( os.getenv('FLASK_CONFIG') or 'default' )
app.run()
