"""
Install:
    $ apt-get install python3-bs4
    $ pip install beautifulsoup4

Installing a parser.
   $ apt-get install python-lxml
    $ easy_install lxml
    $ pip install lxml
    Another alternative is the pure-Python html5lib parser, which parses HTML the way a web browser does. Depending on your setup, you might install html5lib with one of these commands:
    $ apt-get install python-html5lib
    $ easy_install html5lib
    $ pip install html5lib

Making the soup: 
from bs4 import BeautifulSoup
with open("index.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

soup = BeautifulSoup("<html>a web page</html>", 'html.parser')
"""
import bs4 
from lxml import html 

def beautifulSoup_lxml_xml( contents ):
    return bs4.BeautifulSoup( contents , 'lxml-xml') 

def findAll( bs4_result , tag ):
    return bs4_result.findAll( tag )
    return 

