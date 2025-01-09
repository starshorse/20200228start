import requests
import re
from bs4 import BeautifulSoup
URL = 'https://finance.naver.com/'
raw = requests.get(URL)
html = BeautifulSoup(raw.text,'lxml')
#box = html.find('tbody',{'id':'_topItems2'})
#units = box.find_all('tr',{'class':'up'}) # 박스
units_up =  html.select('#_topItems2>tr')  # 오늘 상한가 종목들 전부 다 가져오는거
print('=====금일 상한가 종목=====')
print()
for unit in units_up[:5]:
    title_up = unit.select_one('#_topItems2 > tr> th > a').text
    price_up = unit.select_one('#_topItems2 > tr> td')
    up = unit.select_one('#_topItems2 > tr > td:nth-child(3)').text
    percent_up = unit.select_one('#_topItems2 > tr> td:nth-child(4)')
    
    
    up = up.replace('상한가', '↑')
    
   
    news_up = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=news&query='+title_up
    raw2 = requests.get(news_up)
    html2= BeautifulSoup(raw2.text,'lxml')
    news_up_box = html2.find('div',{'class':'group_news'})
    news_up_list = news_up_box.find_all('div',{'class':'news_area'}) # 박스
    
    
    print('종목 이름:',title_up)
    print('한 주당 가격:',price_up.text+'원')
    print('전날 대비 가격 변동:',up)
    print('전날 대비 등락 :',percent_up.text)
    
    
    print('관련 된 뉴스기사')
    for new in news_up_list[:3]:
        new_title_up = new.find('a',{'class' : 'news_tit'})
        print('뉴스 이름:',new_title_up.text)
        link_up = new.find('a',{'class' : 'api_txt_lines dsc_txt_wrap'})
        new_up = link_up['href']
        print(new_up)
    
    print()
    
    ## 차트 가져오는 코드##
    title_up = unit.select_one('#_topItems2 > tr> th > a')
    chart_up_url = 'https://finance.naver.com'+title_up['href']
    chart_up_raw = requests.get(chart_up_url)
    chart_up_html = BeautifulSoup(chart_up_raw.text,'lxml')
    chart_up = chart_up_html.select_one('#img_chart_area')
    chart_up = chart_up['src']
    chart_up_day = chart_up.replace('area','candle')  #일봉
    chart_up_week = chart_up_day.replace('day','week') #주봉
    chart_up_month = chart_up_day.replace('day','month')#월봉
    print('일봉:',chart_up_day)
    print('주봉:',chart_up_week)
    print('월봉:',chart_up_month)
    
print()
units_down =  html.select('#_topItems3 > tr ')
print('====금일 하한가 종목====')
for unit in units_down[:5]:
    try:
        title_down = unit.select_one('#_topItems3 > tr> th > a').text
        price_down = unit.select_one('#_topItems3 > tr> td')
        down = unit.select_one('#_topItems3 > tr > td:nth-child(3)').text
        percent_down = unit.select_one('#_topItems3 > tr> td:nth-child(4)')
        down = down.replace('상한가', '↓')
        
        news_down = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=news&query='+title_down
        raw3 = requests.get(news_down)
        html3 = BeautifulSoup(raw3.text,'lxml')
        news_down_box = html3.find('div',{'class':'group_news'})
        news_down_list = news_down_box.find_all('div',{'class':'news_area'})
        
        print('종목 이름:' ,title_down)
        print('한 주당 가격:',price_down.text+'원')
        print('전날 대비 가격 변동:',down)
        print('전날 대비 등락 :',percent_down.text)
        
        print('관련된 뉴스기사')
        
        for new in news_down_list[:3]:
            new_title_down = new.find('a',{'class' : 'news_tit'})
            print('뉴스 이름:', new_title_down.text)
            link_down = new.find('a',{'class' : 'api_txt_lines dsc_txt_wrap'})
            
            news_down = link_down['href']
            print(news_down)
        print()
        ## 차트 가져오는 코드##
        title_down = unit.select_one('#_topItems3 > tr> th > a')
        chart_down_url = 'https://finance.naver.com/'+title_down['href']
        chart_down_raw = requests.get(chart_down_url)
        chart_down_html = BeautifulSoup(chart_down_raw.text,'lxml')
        chart_down = chart_down_html.select_one('#img_chart_area')
        chart_down = chart_down['src']
        chart_down_day = chart_down.replace('area','candle')  #일봉
        chart_down_week = chart_down_day.replace('day','week') #주봉
        chart_down_month = chart_down_day.replace('day','month')#월봉
        print('일봉:',chart_down_day)
        print('주봉:',chart_down_week)
        print('월봉:',chart_down_month)
        print()
    except Exception as e:
        print(e) 
