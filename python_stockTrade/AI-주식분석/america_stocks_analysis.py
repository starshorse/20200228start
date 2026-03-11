import yfinance as yf
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import requests
import io
import platform
import datetime
import xml.etree.ElementTree as ET

# ---------------------------------------------------------
# 1. 설정 및 한글 폰트 (시각화용)
# ---------------------------------------------------------
system_name = platform.system()
if system_name == 'Darwin':
    plt.rc('font', family='AppleGothic') 
elif system_name == 'Windows':
    plt.rc('font', family='Malgun Gothic')
plt.rcParams['axes.unicode_minus'] = False 

LOOKBACK_DAYS = 15   # 분석 기간 (최근 15 거래일)
TOP_N = 20           # 분석할 상위 종목 수

print("="*95)
print(f"📈 미국 시장 주도주 및 자금 흐름 분석 시작 (최근 {LOOKBACK_DAYS}일 기준)")
print("="*95)
print("위키피디아에서 S&P 500 및 나스닥 100 종목 정보를 수집 중입니다...")

# ---------------------------------------------------------
# 2. 티커(종목코드) 및 회사명 가져오기 (위키피디아)
# ---------------------------------------------------------
def get_tickers_and_names():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    ticker_map = {} 
    
    try:
        # S&P 500
        url_sp500 = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies'
        r_sp500 = requests.get(url_sp500, headers=headers)
        sp500 = pd.read_html(io.StringIO(r_sp500.text))[0]
        
        for _, row in sp500.iterrows():
            ticker = row['Symbol'].replace('.', '-')
            ticker_map[ticker] = row['Security']

        # Nasdaq 100
        url_nasdaq = 'https://en.wikipedia.org/wiki/Nasdaq-100'
        r_nasdaq = requests.get(url_nasdaq, headers=headers)
        nasdaq100 = pd.read_html(io.StringIO(r_nasdaq.text))[4]
        
        for _, row in nasdaq100.iterrows():
            ticker = row['Ticker'].replace('.', '-')
            if ticker not in ticker_map:
                ticker_map[ticker] = row['Company']
        
        return list(ticker_map.keys()), ticker_map

    except Exception as e:
        print(f"목록 다운로드 중 오류 발생: {e}")
        return [], {}

tickers, ticker_map = get_tickers_and_names()
if not tickers:
    print("티커를 가져오지 못해 프로그램을 종료합니다.")
    exit()

print(f"총 분석 대상 종목 수: {len(tickers)}개")
print("\n주가 데이터를 다운로드합니다. (약 10~20초 소요)")

# ---------------------------------------------------------
# 3. 주가 데이터 다운로드 및 전처리
# ---------------------------------------------------------
# progress=True 로 설정하여 진행률 바 표시
data_raw = yf.download(tickers, period="1mo", progress=True, auto_adjust=False)

# 안전한 가격 컬럼 선택
if 'Adj Close' in data_raw.columns:
    data = data_raw['Adj Close']
elif 'Close' in data_raw.columns:
    data = data_raw['Close']
else:
    print("가격 데이터를 찾을 수 없습니다. 프로그램을 종료합니다.")
    exit()

# 결측치 처리 및 최근 데이터 슬라이싱
recent_data = data.iloc[-LOOKBACK_DAYS:].dropna(axis=1, how='all').ffill().bfill().fillna(0)

if recent_data.empty:
    print("유효한 주가 데이터가 없습니다.")
    exit()

# 수익률 분석 및 상위 종목 선정
start_price = recent_data.iloc[0].replace(0, np.nan)
end_price = recent_data.iloc[-1]
total_return = ((end_price - start_price) / start_price).dropna()

top_performers = total_return.sort_values(ascending=False).head(TOP_N)
top_tickers = top_performers.index.tolist()

# ---------------------------------------------------------
# 4. 구글 뉴스 RSS 함수 (야후 파이낸스 뉴스 오류 완벽 대체)
# ---------------------------------------------------------
def get_google_news(ticker):
    try:
        url = f"https://news.google.com/rss/search?q={ticker}+stock&hl=en-US&gl=US&ceid=US:en"
        resp = requests.get(url, timeout=5)
        root = ET.fromstring(resp.content)
        items = root.findall('./channel/item')
        
        news_list = []
        for item in items[:3]:
            try:
                pub_date = item.find('pubDate').text
                dt = datetime.datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %Z")
                pub_date_str = dt.strftime("%Y-%m-%d")
            except:
                pub_date_str = "날짜미상"

            news_list.append({
                'title': item.find('title').text,
                'date': pub_date_str
            })
        return news_list
    except: 
        return []

# ---------------------------------------------------------
# 5. 시가총액 정보 및 뉴스 수집
# ---------------------------------------------------------
print(f"\n🚀 상위 {TOP_N}개 주도주의 시가총액 및 구글 뉴스 수집 중...")

stock_details = []
for ticker in top_tickers:
    try:
        t = yf.Ticker(ticker)
        # fast_info 사용으로 속도 최적화
        market_cap = t.fast_info.market_cap 
        if market_cap is None: market_cap = 0
        
        full_name = ticker_map.get(ticker, ticker)
        
        stock_details.append({
            'Ticker': ticker,
            'Name': full_name,
            'Return': top_performers[ticker],
            'MarketCap': market_cap,
            'News': get_google_news(ticker)
        })
    except: 
        continue

df_results = pd.DataFrame(stock_details)
df_sorted = df_results.sort_values(by='MarketCap', ascending=False).reset_index(drop=True)

def format_currency(value):
    if value >= 1e12: return f"${value/1e12:.2f}T (조)"
    elif value >= 1e9: return f"${value/1e9:.2f}B (십억)"
    else: return f"${value/1e6:.2f}M (백만)"

# ---------------------------------------------------------
# 6. 결과 리포트 출력
# ---------------------------------------------------------
print("\n" + "="*95)
print(f"📊 [분석 리포트] 최근 {LOOKBACK_DAYS}일 상승 주도주 (시가총액 순 정렬)")
print("="*95)
print(f"{'Rank':<5} {'Ticker':<8} {'수익률':<10} {'시가총액':<15} {'회사명 (Full Name)'}")
print("-" * 95)

for idx, row in df_sorted.iterrows():
    mcap_str = format_currency(row['MarketCap'])
    comp_name = (row['Name'][:35] + '..') if len(row['Name']) > 35 else row['Name']
    print(f"{idx+1:<5} {row['Ticker']:<8} {row['Return']*100:6.2f}%    {mcap_str:<15} {comp_name}")

print("\n" + "="*95)
print(f"📰 [최신 이슈] 종목별 주요 뉴스 (Google News RSS)")
print("="*95)

for idx, row in df_sorted.iterrows():
    print(f"\n📌 [{idx+1}위] {row['Ticker']} ({row['Name']}) | 시총: {format_currency(row['MarketCap'])}")
    
    if not row['News']:
        print("   (관련 뉴스를 찾을 수 없습니다)")
    else:
        for i, news in enumerate(row['News'], 1):
            print(f"   {i}. [{news['date']}] {news['title']}")

# ---------------------------------------------------------
# 7. 자금 흐름(주가 유사성) 클러스터맵 시각화 및 종료 처리
# ---------------------------------------------------------


top_data = recent_data[top_tickers]
top_daily_returns = top_data.pct_change(fill_method=None).fillna(0).replace([np.inf, -np.inf], 0)
corr_matrix = top_daily_returns.corr().fillna(0)

if corr_matrix.shape[0] >= 2:
    plt.figure(figsize=(12, 12))
    sns.set_theme(style="white")
    if system_name == 'Darwin': plt.rc('font', family='AppleGothic') 
    elif system_name == 'Windows': plt.rc('font', family='Malgun Gothic')

    try:
        g = sns.clustermap(
            corr_matrix, annot=True, fmt=".2f", cmap="RdBu_r", vmin=-1, vmax=1,
            figsize=(13, 13), dendrogram_ratio=(.1, .1), cbar_pos=(.02, .32, .03, .2)
        )
        g.fig.suptitle(f'Top {TOP_N} Stocks Correlation', fontsize=16, y=1.02)
        
        print("\n" + "="*95)
        print("📊 주가 상관관계(자금 흐름) 히트맵 창이 열렸습니다.")
        print("💡 그래프 창을 마우스로 닫거나, 이 CMD 창에서 [Ctrl + C]를 누르면 안전하게 종료됩니다.")
        print("="*95)
        
        plt.show(block=False) 
        
        # [핵심 수정] 프리징 방지 및 Ctrl+C 응답 처리를 위한 이벤트 루프
        while plt.fignum_exists(g.fig.number):
            plt.pause(0.1)

    except KeyboardInterrupt:
        print("\n[Ctrl+C] 사용자 요청으로 프로그램을 안전하게 종료합니다.")
    except Exception as e:
        print(f"\n시각화 오류: {e}")
    finally:
        plt.close('all') 
else:
    print("\n시각화할 종목 데이터가 부족합니다.")
