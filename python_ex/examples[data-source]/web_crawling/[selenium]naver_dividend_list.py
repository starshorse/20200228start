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
selenium.get('https://finance.naver.com/sise/dividend_list.naver')

html = driver.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
