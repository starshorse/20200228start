import sys, os 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time

# If os is ubuntu.. 
#sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
sys.path.append("C:\\workdir\\gitdn\\20200228start\\python_ex\\modules") 
print( sys.path )
#from modules import selenium
#import my_selenium as selenium 

#driver = selenium.getDriver()
selenium.get(
        'https://member.paxnet.co.kr/rpan/member/login?returnURL=https%3A%2F%2Fwww.paxnet.co.kr%2F'
        )


chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
# 불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
# 브라우저 생성
# --start-maximized 
chrome_options.add_argument("--start-maximized")

browser = webdriver.Chrome(options=chrome_options)
browser.get('http://192.168.0.94:9000')
# Keyboard & Text Inputs 
email_input = browser.find_element( By.ID, 'email_address' );
email_input.send_keys('star_horse@naver.com');
password_input = browser.find_element( By.ID, 'password' );
password_input.send_keys('ch1whdrb');

# click a button 
button = browser.find_element( By.ID, 'btn_login'); 
button.click();


time.sleep(5)

# find element By.TAG_NAME
buttons = browser.find_elements( By.TAG_NAME, 'button') 
for button in buttons:
    value = button.get_attribute("value")
    print( value )
    if value == 'ezoffice':
        button.click() 

time.sleep(5)


html = driver.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
