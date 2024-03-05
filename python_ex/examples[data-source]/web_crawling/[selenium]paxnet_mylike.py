import sys, os 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# If os is ubuntu.. 
#sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
#sys.path.append("C:\\workdir\\gitdn\\20200228start\\python_ex\\modules") 
sys.path.append("F:\\gitdn\\20200228start\\python_ex\\modules") 
print( sys.path )
#from modules import selenium
import my_selenium as selenium 

#driver = selenium.getDriver()
browser = selenium.get(
        'https://member.paxnet.co.kr/rpan/member/login?returnURL=https%3A%2F%2Fwww.paxnet.co.kr%2F'
        )


# Keyboard & Text Inputs 
email_input = browser.find_element( By.ID, 'custId' );
email_input.send_keys('starshorse');
password_input = browser.find_element( By.ID, 'passwd' );
password_input.send_keys('ch1whdrb');

# click a button 
button = browser.find_element( By.XPATH, '/html/body/div[2]/div[1]/div[1]/div/div/form/fieldset/button'); 
button.click();


time.sleep(5)
browser = selenium.get(
    'https://www.paxnet.co.kr/item/like/myLike?userId=starshorse'
        )
"""
# find element By.TAG_NAME
buttons = browser.find_elements( By.TAG_NAME, 'button') 
for button in buttons:
    value = button.get_attribute("value")
    print( value )
    if value == 'ezoffice':
        button.click() 

time.sleep(5)
"""

html = browser.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
print(table[1]);
browser.close()
