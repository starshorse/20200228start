"""
    table.decompose() - remove specific element.. 
    다이나믹 로드되는 table을 BS에서는 잡지 못해서 불용.. 
"""
import pandas as pd
import urllib 
from bs4 import BeautifulSoup 

url = 'https://finance.daum.net/domestic/influential_investors?market=KOSPI';
html_table = urllib.request.urlopen( url).read() 

# fix HTML 
soup = BeautifulSoup( html_table, "html.parser" )

#for table in soup.find_all('table', {'class':'tab'}):
for table in soup.find_all('table'):
    #table.decompose()
    print( table );


table = pd.read_html(str(soup), flavor="bs4")
print(table[1]);
