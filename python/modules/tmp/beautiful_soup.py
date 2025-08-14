from bs4 import BeautifulSoup 
import json 
import pandas as pd 
import pdb 

f = open('bs4_test.html','r')

soup = BeautifulSoup( f, 'html.parser' ) 
p1 = soup.find('p')
p1 = soup.find('p', align="right") 
p1 = soup.find_all('p') 

for i in p1:
    print(i.string) 
    print(i.get_text()) 

p1 = soup.select('p[align="right"]')
#pdb.set_trace();

print(p1) 

print( f )
print( soup.select('tr') ) 
print( soup.find_all('table')) 

table_data = [[cell.text for cell in row("td")] for row in soup.find_all("tr")]
print( json.dumps( dict(table_data )))

table = soup.find('table')
print(table)
#############################################################################
#    str function resolved  pd.read_html   ERROR.. 
#############################################################################
df = pd.read_html( str(table) );
print( df )


