from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep 
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller as chromedriver

chromedriver.install()


chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
# 불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
# 브라우저 생성
# --start-maximized 
chrome_options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=chrome_options)
#driver = webdriver.Chrome()

def get( url ):
    driver.get(url );
    sleep(3)
    return driver 

def getDriver():
    global driver
    return driver 
"""
find_element: 
find_element(By.ID, "id")
find_element(By.NAME, "name")
find_element(By.XPATH, "xpath")
find_element(By.LINK_TEXT, "link text")
find_element(By.PARTIAL_LINK_TEXT, "partial link text")
find_element(By.TAG_NAME, "tag name")
find_element(By.CLASS_NAME, "class name")
find_element(By.CSS_SELECTOR, "css selector")
login_form = driver.find_element(By.ID, 'loginForm')
"""
def f_elem_by_className( className ):
    return driver.find_element( By.CLASS_NAME , className ) 

def f_elem_by_xpath( xpath):
    return driver.find_element( By.XPATH, xpath )  
