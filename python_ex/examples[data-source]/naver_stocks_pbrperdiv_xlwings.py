# hello.py
import numpy as np
import xlwings as xw
#import web_crawling.[bs4]naver_stocks_pbrperdiv as pbrperdiv 
import importlib
pbrperdiv = importlib.import_module("web_crawling.[bs4]naver_stocks_pbrperdiv")
codeFiance = importlib.import_module("web_crawling.[bs4]naver_stocks_fianceCode")
naverNews = importlib.import_module("web_crawling.[bs4]naver_stocks_news")

def main():
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver Crawling Started!'
    pbrperdiv.main('KOSPI');
    wb.sheets[2]['G3'].value = 'naver Crawling Fishied!'

def kosdaq_main():
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver Crawling Started!'
    pbrperdiv.main('KOSDAQ');
    wb.sheets[2]['G3'].value = 'naver Crawling Fishied!'

def kospi_mine():
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver Crawling Started!'
    pbrperdiv.update_myStocks('KOSPI');
    wb.sheets[2]['G3'].value = 'naver Crawling Fishied!'

def kosdaq_mine():
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver Crawling Started!'
    pbrperdiv.update_myStocks('KOSDAQ');
    wb.sheets[2]['G3'].value = 'naver Crawling Fishied!'

def codeFinance( code ):
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver get CodeFinace Started!'
    code = str( code ).zfill(6); 
    codeFiance.get_codeFinance( code ) 
    wb.sheets[2]['G3'].value = 'naver get CodeFiance Fishied!'

def stockNews( stock_name ):
    wb = xw.Book.caller()
    wb.sheets[2]['G3'].value = 'naver get naverNews Started!'
    naverNews.get_naverNews( stock_name ) 
    wb.sheets[2]['G3'].value = 'naver get naverNews Fishied!'


if __name__=='__main__':
    pbrperdiv.main();
