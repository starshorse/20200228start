import sys, os 
import pandas as pd
from bs4 import BeautifulSoup  
from os import listdir 
from time import sleep 
import pdb
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time
import chromedriver_autoinstaller as chromedriver

chromedriver.install()

dir_path = os.path.dirname(os.path.realpath(__file__))
module_dir = os.path.normpath( os.path.join( dir_path ,'..\\..\\modules') )
data_krx_path = os.path.normpath( os.path.join( dir_path, 'data_krx' )) 

sys.path.append( module_dir )

print( sys.path )
#from modules import selenium
#import my_selenium as selenium 

#driver = selenium.getDriver()
chrome_options = Options()
"""
#prefs = {'download.default_directory' : '/path/to/dir'}
prefs = {'download.default_directory' : dir_path }
chrome_options.add_experimental_option('prefs', prefs)
"""
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--allow-running-insecure-content")  # Allow insecure content
chrome_options.add_argument("--unsafely-treat-insecure-origin-as-secure=http://data.krx.co.kr")  # Replace example.com with your site's domain
chrome_options.add_experimental_option("prefs", {
    "download.default_directory": data_krx_path,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
})
driver = webdriver.Chrome(options=chrome_options)

browser = driver.get(
        'http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201020502'
        )
time.sleep(5)
driver.find_element(By.CSS_SELECTOR, ".CI-MDI-UNIT-DOWNLOAD > img").click()
time.sleep(5)
driver.find_element(By.LINK_TEXT, "Excel").click()
element = driver.find_element(By.LINK_TEXT, "Excel")
actions = ActionChains(driver)
actions.move_to_element(element).perform()

time.sleep(10)
"""
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
# find element By.TAG_NAME
buttons = browser.find_elements( By.TAG_NAME, 'button') 
for button in buttons:
    value = button.get_attribute("value")
    print( value )
    if value == 'ezoffice':
        button.click() 

time.sleep(5)

html = browser.page_source 
soup = BeautifulSoup( html ) 

table = pd.read_html(str(soup), flavor="bs4")
print(table[0]);
print(table[1]);

"""

#driver.close()
