import sys, os 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

dir_path = os.path.dirname(os.path.realpath(__file__))
module_dir = os.path.normpath( os.path.join( dir_path ,'..\\..\\modules') )

sys.path.append( module_dir )
# If os is ubuntu.. 
#sys.path.append('/home/rrr/workdir/gitdn/20200228start/python_ex/modules' ) 
#sys.path.append("C:\\workdir\\gitdn\\20200228start\\python_ex\\modules") 
#sys.path.append("F:\\gitdn\\20200228start\\python_ex\\modules") 

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

"""
WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.XPATH,"//iframe[contains(@src, 'historical_data_feed')]")))
driver.execute_script("return arguments[0].scrollIntoView(true);", WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.XPATH, "//li[text()='Indices (CFD)']"))))
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,"//div[text()='Tick']"))).click()
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,"//div[text()='Day']"))).click()
"""
#WebDriverWait(browser, 10).until(EC.element_to_be_clickable((By.XPATH,'//*[@id="contents"]/div[1]/div[3]/span/div/button'))).click();
browser.find_element(by=By.XPATH,value='//*[@id="contents"]/div[1]/div[3]/span/div/button').click()                                                                                                           

#//*[@id="contents"]/div[1]/div[3]/span/div/div/ul
#//*[@id="contents"]/div[1]/div[3]/span/div/button
#element = browser.find_element(by=By.XPATH,value='//span[contains(text(), "보유종목[중소형]")]')                                                                                                           
#/html/body/div[2]/div[4]/form/div/div[1]/div[3]/span/div/button
#//*[@id="contents"]/div[1]/div[3]/span/div/button
#element.click()
html = browser.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
print(table[1]);

browser.close()
