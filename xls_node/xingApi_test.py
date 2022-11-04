import xingApi.connect as xa 
import pdb 
import os
from dotenv import load_dotenv
from pathlib import Path 

dotenv_path = Path('../.env')
load_dotenv( dotenv_path = dotenv_path ) 
id_ = os.environ.get('EBEST_ID') 
passwd_ = os.environ.get('EBEST_PW') 

session = xa.XASession() 
session.login( id_ , passwd_ ) 

pdb.set_trace() 
