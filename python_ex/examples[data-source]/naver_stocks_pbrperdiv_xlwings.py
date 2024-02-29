# hello.py
import numpy as np
import xlwings as xw
#import web_crawling.[bs4]naver_stocks_pbrperdiv as pbrperdiv 
import importlib
pbrperdiv = importlib.import_module("web_crawling.[bs4]naver_stocks_pbrperdiv")

def main():
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver Crawling Started!'
    pbrperdiv.main();
    wb.sheets[2]['G3'].value = 'naver Crawling Fishied!'


if __name__=='__main__':
    pbrperdiv.main();
