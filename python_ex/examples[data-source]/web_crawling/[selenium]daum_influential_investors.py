import sys, os 
# If os is ubuntu.. 
#sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
sys.path.append("C:\\workdir\\gitdn\\20200228start\\python_ex\\modules") 
print( sys.path )
#from modules import selenium
import my_selenium as selenium 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb

driver = selenium.getDriver()
selenium.get('https://finance.daum.net/domestic/influential_investors')

html = driver.page_source 
#items = selenium.f_elem_by_className('box_contents') 
#df = pd.read_html( driver.page_source )[0]
soup = BeautifulSoup( html ) 
"""
for table in soup.find_all('table', {'class':'tab'}):
    table.decompose()
"""    

table = pd.read_html(str(soup), flavor="bs4")
print(table[1]);
#pdb.set_trace();






