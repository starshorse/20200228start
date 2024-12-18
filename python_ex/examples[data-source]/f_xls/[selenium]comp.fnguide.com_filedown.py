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
from datetime import datetime 
import chromedriver_autoinstaller as chromedriver

chromedriver.install()

dir_path = os.path.dirname(os.path.realpath(__file__))
module_dir = os.path.normpath( os.path.join( dir_path ,'..\\..\\modules') )
data_krx_path = os.path.normpath( os.path.join( dir_path, 'data_krx' )) 
data_companyguide_path = os.path.normpath( os.path.join( dir_path, 'data_companyguide', datetime.now().strftime('%Y%m%d'))) 

sys.path.append( module_dir )

print( sys.path )
#from modules import selenium
#import my_selenium as selenium 

#driver = selenium.getDriver()
chrome_options = Options()
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--allow-running-insecure-content")  # Allow insecure content
chrome_options.add_argument("--unsafely-treat-insecure-origin-as-secure=http://data.krx.co.kr")  # Replace example.com with your site's domain
chrome_options.add_experimental_option("prefs", {
    "download.default_directory": data_companyguide_path,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
})
driver = webdriver.Chrome(options=chrome_options)

browser = driver.get(
        'https://comp.fnguide.com/SVO2/ASP/SVD_idxRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=302&stkGb=701'
        )
time.sleep(5)
driver.find_element(By.ID, "selUpjong").click()
dropdown = driver.find_element( By.ID , "selUpjong") 
dropdown.find_element( By.XPATH, "//option[. = '전체']").click()                              
driver.find_element( By.ID, "btnSearch").click()                                          
time.sleep(5)
driver.find_element(By.LINK_TEXT, "Download").click()
time.sleep(10)

#driver.close()
