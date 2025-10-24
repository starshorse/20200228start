"""
뉴스 분석 대시보드 (Gradio)
주제를 입력하면 관련 뉴스를 검색하고 요약, 키워드 추출, 감성 분석을 수행합니다.
"""

# ===== 환경 설정 및 기본 라이브러리 =====
from dotenv import load_dotenv
load_dotenv()

import os
import re
import json
import warnings
from typing import List, Dict, Any, Optional, Literal
from textwrap import dedent
from pprint import pprint
import datetime
from email.utils import parsedate_to_datetime
from dateutil import parser as date_parser
import pytz

warnings.filterwarnings("ignore")

# ===== 외부 라이브러리 =====
import requests
import gradio as gr
import matplotlib.pyplot as plt
import bs4
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader

# ===== LLM 초기화 =====
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# ===== 한글 폰트 설정 =====
plt.rcParams['font.family'] = 'AppleGothic'
plt.rcParams['axes.unicode_minus'] = False


# ===== 네이버 뉴스 검색 =====
def naver_news_search(query: str) -> List[Dict]:
    """네이버 검색 API를 사용하여 뉴스 검색 결과를 조회합니다.

    Args:
        query (str): 검색어

    Returns:
        List[Dict]: 검색 결과 리스트
    """
    url = "https://openapi.naver.com/v1/search/news.json"
    headers = {
        "X-Naver-Client-Id": os.getenv("NAVER_CLIENT_ID"),
        "X-Naver-Client-Secret": os.getenv("NAVER_CLIENT_SECRET")
    }
    params = {
        "query": query,
        "display": 20,
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        return []
    
    return response.json()["items"]


# ===== 날짜 파싱 함수 =====
def parse_date_flexible(date_str: str) -> Optional[datetime.datetime]:
    """다양한 형식의 날짜 문자열을 파싱하는 함수"""
    if not date_str or not isinstance(date_str, str):
        return None
        
    # 1. RFC 822 형식 시도
    try:
        return parsedate_to_datetime(date_str)
    except (ValueError, TypeError):
        pass
    
    # 2. ISO 형식 시도
    try:
        return datetime.datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    except (ValueError, TypeError):
        pass
    
    # 3. 한글 날짜 형식 처리
    korean_pattern = r'(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(오전|오후)?\s*(\d{1,2})시\s*(\d{1,2})분'
    match = re.search(korean_pattern, date_str)
    if match:
        year, month, day, ampm, hour, minute = match.groups()
        hour = int(hour)
        if ampm == '오후' and hour < 12:
            hour += 12
        elif ampm == '오전' and hour == 12:
            hour = 0
        
        try:
            return datetime.datetime(int(year), int(month), int(day), hour, int(minute))
        except (ValueError, TypeError):
            pass
    
    # 4. dateutil 파서 사용
    try:
        return date_parser.parse(date_str, fuzzy=True)
    except (ValueError, TypeError):
        pass
    
    return None


# ===== 날짜 필터링 =====
def filter_news_by_date_naver(news_data: List[Dict[str, Any]], days_limit: int = 7) -> List[Dict[str, Any]]:
    """네이버 뉴스 검색 API 결과를 최근 기간으로 필터링"""
    if not news_data:
        return []
    
    filtered_news = []
    current_date = datetime.datetime.now()
    cutoff_date = current_date - datetime.timedelta(days=days_limit)
    
    for i, news in enumerate(news_data):
        pub_date = news.get('pubDate')
        
        if not pub_date:
            continue
            
        try:
            news_date = parse_date_flexible(pub_date)
            
            if not news_date:
                continue
            
            if news_date.tzinfo is not None:
                news_date = news_date.replace(tzinfo=None)
                        
            if news_date >= cutoff_date:
                filtered_news.append(news)
                
        except Exception as e:
            continue
    
    return filtered_news


# ===== 텍스트 정리 =====
def clean_text(text: str) -> str:
    """텍스트에서 불필요한 공백과 특수문자를 제거"""
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text


# ===== 정보 추출을 위한 Pydantic 모델 =====
class ExtractedInfo(BaseModel):
    """뉴스 기사에서 추출된 정보"""
    title: str = Field(description="뉴스 기사 제목")
    author: Optional[str] = Field(description="작성자 또는 언론사")
    published_date: Optional[str] = Field(description="게시 날짜")
    summary: str = Field(description="기사 요약 (2-3문장)")
    main_content: str = Field(description="기사의 주요 내용 요약")


# ===== 정보 추출 체인 =====
extraction_prompt = ChatPromptTemplate.from_messages([
    ("system", """당신은 뉴스 기사에서 정보를 추출하는 전문가입니다.
    주어진 텍스트에서 다음 정보를 추출하세요:
    - 제목
    - 작성자 또는 언론사
    - 게시 날짜
    - 기사 요약 (2-3문장)
    - 주요 내용 요약"""),
    ("human", "{text}")
])

extraction_llm = llm.with_structured_output(ExtractedInfo)
extraction_chain = extraction_prompt | extraction_llm


# ===== 기사 추출 및 처리 =====
def extract_articles(query: str, num_articles: int = 3) -> List:
    """네이버 뉴스를 검색하고 기사를 추출하여 처리"""
    
    # 뉴스 검색
    news_items = naver_news_search(query)
    
    if not news_items:
        return []
    
    # 최근 7일 이내 뉴스로 필터링
    filtered_news = filter_news_by_date_naver(news_items, days_limit=7)
    
    if not filtered_news:
        filtered_news = news_items[:num_articles]
    
    processed_docs = []
    
    for news_item in filtered_news:
        title = clean_text(re.sub(r'<[^>]+>', '', news_item.get('title', '')))
        url = news_item.get('link', '')
        
        # 네이버 뉴스만 처리
        if "naver.com" not in url:
            continue

        try:
            loader = WebBaseLoader(
                url, 
                header_template={"User-Agent": "Mozilla/5.0"},
                bs_kwargs=dict(
                    parse_only=bs4.SoupStrainer(
                        class_=("media_end_head", "newsct_article _article_body", "go_trans _article_content"),
                    )
                ),
            )
            
            # 뉴스 본문 로드
            docs = loader.load()
            if not docs:
                continue
                
            doc = docs[0]

            # 불필요한 공백 문자 제거
            doc.page_content = clean_text(doc.page_content)
            
            # 정보 추출 수행
            try:
                result = extraction_chain.invoke({"text": doc.page_content})
                
                # 추출된 정보를 메타데이터에 추가
                doc.metadata["title"] = title
                doc.metadata["source"] = url
                doc.metadata.update(result.model_dump())

                # 처리된 문서 리스트에 추가
                processed_docs.append(doc)

                # 기사 수 제한
                if len(processed_docs) >= num_articles:
                    break
            except Exception as e:
                print(f"정보 추출 중 오류: {e}")
                continue
                
        except Exception as e:
            print(f"기사 로드 중 오류: {e}")
            continue
    
    return processed_docs


# ===== LLM 분석 체인 =====

# 요약 체인
summarization_prompt = ChatPromptTemplate.from_messages([
    ("system", "다음 텍스트를 간결하게 요약하세요. 핵심 내용만 포함하고 중요한 정보는 유지하세요. (공백 포함 100글자 이내로 요약)"),
    ("human", "{text}")
])
summarization_chain = summarization_prompt | llm | StrOutputParser()


# 키워드 추출
class Keywords(BaseModel):
    """텍스트에서 추출된 키워드 목록"""
    keywords: List[str] = Field(description="텍스트에서 추출된 중요 키워드 목록")

keyword_extraction_prompt = ChatPromptTemplate.from_messages([
    ("system", "다음 텍스트에서 중요한 키워드를 추출하세요. 키워드는 텍스트의 핵심 주제와 개념을 나타내야 합니다. (최대 10개)"),
    ("human", "{text}")
])

keyword_extraction_llm = llm.with_structured_output(Keywords)
keyword_extraction_chain = keyword_extraction_prompt | keyword_extraction_llm


# 감성 분석
class SentimentAnalysis(BaseModel):
    """뉴스 기사의 감성 분석 결과"""
    sentiment: Literal["긍정적", "부정적", "중립적"] = Field(description="감성 분석 결과")
    score: float = Field(description="감성 점수 (0~1, 1에 가까울수록 긍정적)")
    key_phrases: List[str] = Field(description="기사에서 감성을 나타내는 주요 구문")
    explanation: str = Field(description="감성 분석 결과에 대한 설명")

sentiment_prompt = ChatPromptTemplate.from_messages([
    ("system", """당신은 뉴스 기사의 감성을 분석하는 전문가입니다. 
    주어진 뉴스 기사를 분석하여 긍정적, 부정적, 중립적 감성을 파악하세요.
    감성 점수는 0(매우 부정적)에서 1(매우 긍정적) 사이의 값으로 제공하세요.
    기사에서 감성을 나타내는 주요 구문을 추출하고 분석 결과를 설명하세요."""),
    ("human", "{news_article}")
])

structured_llm = llm.with_structured_output(SentimentAnalysis)
sentiment_analysis_chain = sentiment_prompt | structured_llm


# ===== 메인 처리 함수 =====
def process_query(query, num_articles):
    """사용자 질문을 처리하고 결과를 반환하는 함수"""
    
    # 쿼리 전처리
    query = query.strip()
    
    if not query:
        return "주제를 입력해주세요.", [], None, "분석 결과가 없습니다.", {}
    
    try:
        # 뉴스 검색
        articles = extract_articles(query, int(num_articles))
        
        if not articles:
            return "검색 결과가 없습니다. 다른 주제로 시도해주세요.", [], None, "분석 결과가 없습니다.", {}
        
        results = []
        
        # 각 기사 분석
        for article_info in articles:
            article = article_info.page_content
            if article:
                try:
                    # 요약
                    summary = summarization_chain.invoke({"text": article})
                    # 키워드 추출
                    keywords = keyword_extraction_chain.invoke({"text": article})
                    # 감성 분석
                    sentiment_analysis = sentiment_analysis_chain.invoke({"news_article": article})
                    
                    # 결과 저장
                    result = {
                        "title": article_info.metadata.get("title", "제목 없음"),
                        "url": article_info.metadata.get("source", ""),
                        "summary": summary,
                        "sentiment": sentiment_analysis.sentiment,
                        "sentiment_score": sentiment_analysis.score,
                        "keywords": keywords.keywords
                    }
                    results.append(result)
                except Exception as e:
                    print(f"기사 분석 중 오류: {e}")
                    continue
        
        if not results:
            return "기사 분석에 실패했습니다.", [], None, "분석 결과가 없습니다.", {}

        # 키워드 빈도 계산
        keyword_counts = {}
        for result in results:
            for keyword in result['keywords']:
                keyword_counts[keyword] = keyword_counts.get(keyword, 0) + 1

        # 키워드 정렬
        all_keywords = sorted(keyword_counts.items(), key=lambda x: x[1], reverse=True)

        # 감성 분석 결과 종합
        sentiment_counts = {"긍정적": 0, "중립적": 0, "부정적": 0}
        for result in results:
            sentiment_counts[result['sentiment']] += 1
        
        # 차트 생성
        def generate_keyword_chart(keywords):
            """키워드 빈도 차트 생성"""
            if not keywords:
                return None
                
            words = [k[0] for k in keywords[:10]]
            counts = [k[1] for k in keywords[:10]]
            
            fig, ax = plt.subplots(figsize=(10, 6))
            ax.bar(words, counts, color='skyblue')
            ax.set_xticklabels(words, rotation=45, ha='right')
            ax.set_title('주요 키워드 빈도')
            ax.set_xlabel('키워드')
            ax.set_ylabel('빈도수')
            plt.tight_layout()
            
            return fig
        
        keyword_chart = generate_keyword_chart(all_keywords)
        
        # 결과 요약 생성
        summary_text = f"총 {len(results)}개의 뉴스 기사를 분석했습니다.\n\n"    
        summary_text += f"감성 분석 결과: 긍정적 {sentiment_counts['긍정적']}개, 중립적 {sentiment_counts['중립적']}개, 부정적 {sentiment_counts['부정적']}개\n\n"
        
        # 기사별 분석 결과 HTML 생성
        articles_html = ""
        for i, result in enumerate(results, 1):
            articles_html += f"<div style='margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;'>"
            articles_html += f"<h3>{i}. {result['title']}</h3>"
            articles_html += f"<p><strong>URL:</strong> <a href='{result['url']}' target='_blank'>{result['url']}</a></p>"
            articles_html += f"<p><strong>요약:</strong> {result['summary']}</p>"
            articles_html += f"<p><strong>감성:</strong> {result['sentiment']} (점수: {result['sentiment_score']:.2f})</p>"
            
            # 키워드 태그
            articles_html += f"<p><strong>주요 키워드:</strong> "
            for keyword in result['keywords'][:5]:
                articles_html += f"<span style='display: inline-block; background-color: #4299e1; color: white; padding: 3px 8px; margin: 2px; border-radius: 10px; font-weight: 500;'>{keyword}</span>"
            articles_html += "</p></div>"
        
        return summary_text, all_keywords, keyword_chart, articles_html, results
        
    except Exception as e:
        error_msg = f"처리 중 오류가 발생했습니다: {str(e)}"
        return error_msg, [], None, error_msg, {}


# ===== Gradio 인터페이스 =====
with gr.Blocks(title="뉴스 분석 대시보드", theme=gr.themes.Soft(), analytics_enabled=False) as demo:
    gr.Markdown("# 🔍 뉴스 분석 대시보드")
    gr.Markdown("주제를 입력하면 관련 뉴스를 검색하고 요약, 키워드 추출, 감성 분석을 수행합니다.")
    
    with gr.Row():
        with gr.Column(scale=4):
            query_input = gr.Textbox(
                label="분석할 주제 입력", 
                placeholder="예: 인공지능, 기후변화, 경제 등"
            )
        with gr.Column(scale=1):
            num_articles = gr.Slider(
                label="분석할 기사 수", 
                minimum=1, 
                maximum=10, 
                value=3, 
                step=1
            )
    
    analyze_btn = gr.Button("뉴스 분석하기", variant="primary")
    
    # 결과 출력 영역
    with gr.Tabs():
        with gr.TabItem("요약 및 키워드"):
            summary_output = gr.Textbox(label="분석 요약", lines=5)
            
            with gr.Row():
                with gr.Column():
                    keywords_output = gr.Dataframe(
                        headers=["키워드", "빈도수"],
                        label="주요 키워드"
                    )
                with gr.Column():
                    chart_output = gr.Plot(label="키워드 빈도 차트")
        
        with gr.TabItem("상세 분석 결과"):
            articles_output = gr.HTML(label="기사별 분석 결과")
        
        with gr.TabItem("JSON 데이터"):
            json_output = gr.JSON(label="원시 데이터")
    
    analyze_btn.click(
        process_query,
        inputs=[query_input, num_articles],
        outputs=[summary_output, keywords_output, chart_output, articles_output, json_output]
    )
    
    gr.Markdown("## 사용 방법")
    gr.Markdown("""
    1. 분석할 주제를 입력합니다 (예: '인공지능', '기후변화', '경제 위기' 등).
    2. 분석할 뉴스 기사 수를 선택합니다.
    3. '뉴스 분석하기' 버튼을 클릭합니다.
    4. 분석 결과는 세 개의 탭에 나누어 표시됩니다:
        - 요약 및 키워드: 전체 분석 요약과 주요 키워드 및 차트
        - 상세 분석 결과: 각 기사별 분석 내용 (요약, 감성, 키워드)
        - JSON 데이터: 원시 분석 데이터
    """)


if __name__ == "__main__":
    demo.launch(share=False)
