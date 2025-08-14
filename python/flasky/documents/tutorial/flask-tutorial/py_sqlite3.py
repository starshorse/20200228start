import sqlite3 
from flask import g 

if 'db' not in g:
    conn = sqlite3.connect('database.db') 
