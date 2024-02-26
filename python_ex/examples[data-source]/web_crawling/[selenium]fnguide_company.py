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
selenium.get('https://comp.fnguide.com/SVO2/ASP/SVD_UJRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=301&stkGb=')

html = driver.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
