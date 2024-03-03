import requests
import re
from bs4 import BeautifulSoup
URL = 'https://finance.naver.com/'
raw = requests.get(URL)
html = BeautifulSoup(raw.text,'lxml')
print('===== 종목뉴스 =====')
print()
    
def get_naverNews( title_up ):   
    news_up = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=news&query='+title_up
    raw2 = requests.get(news_up)
    html2= BeautifulSoup(raw2.text,'lxml')
    news_up_box = html2.find('div',{'class':'group_news'})
    news_up_list = news_up_box.find_all('div',{'class':'news_area'}) # 박스
    
    print('종목 이름:',title_up)
    print('관련 된 뉴스기사')
    for new in news_up_list[:3]:
        new_title_up = new.find('a',{'class' : 'news_tit'})
        print('뉴스 이름:',new_title_up.text)
        link_up = new.find('a',{'class' : 'api_txt_lines dsc_txt_wrap'})
        new_up = link_up['href']
        print(new_up)

    input('Press  any key to continue..')
    

if __name__=='__main__':
    get_naverNews('삼성전자');
