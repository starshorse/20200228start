import PyPDF2
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from googletrans import Translator
import os

class PDFTranslator:
    def __init__(self):
        self.translator = Translator()
        
        # 한글 폰트 등록 (시스템에 맞게 경로 수정 필요)
        try:
            # Windows
            font_path = "C:/Windows/Fonts/malgun.ttf"
            if os.path.exists(font_path):
                pdfmetrics.registerFont(TTFont('Korean', font_path))
            else:
                # Mac
                font_path = "/System/Library/Fonts/AppleGothic.ttf"
                if os.path.exists(font_path):
                    pdfmetrics.registerFont(TTFont('Korean', font_path))
                else:
                    # Linux (일반적인 경로)
                    font_path = "/usr/share/fonts/truetype/nanum/NanumGothic.ttf"
                    pdfmetrics.registerFont(TTFont('Korean', font_path))
        except Exception as e:
            print(f"폰트 로드 실패: {e}")
            print("기본 폰트를 사용합니다.")
    
    def extract_text_from_pdf(self, pdf_path):
        """PDF에서 텍스트 추출"""
        print(f"PDF 읽는 중: {pdf_path}")
        text_by_page = []
        
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            
            for page_num in range(total_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                text_by_page.append(text)
                print(f"페이지 {page_num + 1}/{total_pages} 추출 완료")
        
        return text_by_page
    
    def translate_text(self, text, src='en', dest='ko'):
        """텍스트를 한국어로 번역"""
        if not text.strip():
            return ""
        
        try:
            # 긴 텍스트는 청크로 나누어 번역
            max_length = 4500
            if len(text) > max_length:
                chunks = [text[i:i+max_length] for i in range(0, len(text), max_length)]
                translated_chunks = []
                for chunk in chunks:
                    result = self.translator.translate(chunk, src=src, dest=dest)
                    translated_chunks.append(result.text)
                return ' '.join(translated_chunks)
            else:
                result = self.translator.translate(text, src=src, dest=dest)
                return result.text
        except Exception as e:
            print(f"번역 오류: {e}")
            return text
    
    def create_pdf(self, translated_texts, output_path):
        """번역된 텍스트로 새 PDF 생성"""
        print(f"\n번역된 PDF 생성 중: {output_path}")
        
        doc = SimpleDocTemplate(output_path, pagesize=A4,
                               rightMargin=72, leftMargin=72,
                               topMargin=72, bottomMargin=18)
        
        # 스타일 설정
        styles = getSampleStyleSheet()
        korean_style = ParagraphStyle(
            'Korean',
            parent=styles['Normal'],
            fontName='Korean',
            fontSize=10,
            leading=16,
            wordWrap='CJK'
        )
        
        story = []
        
        for page_num, text in enumerate(translated_texts, 1):
            if text.strip():
                # 단락별로 나누어 처리
                paragraphs = text.split('\n')
                for para in paragraphs:
                    if para.strip():
                        p = Paragraph(para, korean_style)
                        story.append(p)
                        story.append(Spacer(1, 0.2*inch))
            
            # 페이지가 끝나면 페이지 브레이크
            if page_num < len(translated_texts):
                story.append(PageBreak())
            
            print(f"페이지 {page_num}/{len(translated_texts)} 생성 완료")
        
        doc.build(story)
        print(f"\n✅ 완료! 파일이 저장되었습니다: {output_path}")
    
    def translate_pdf(self, input_pdf, output_pdf):
        """전체 번역 프로세스 실행"""
        print("=" * 50)
        print("PDF 번역 시작")
        print("=" * 50)
        
        # 1. PDF에서 텍스트 추출
        text_by_page = self.extract_text_from_pdf(input_pdf)
        
        # 2. 각 페이지 텍스트 번역
        print("\n번역 중...")
        translated_texts = []
        for i, text in enumerate(text_by_page, 1):
            print(f"페이지 {i}/{len(text_by_page)} 번역 중...")
            translated = self.translate_text(text)
            translated_texts.append(translated)
        
        # 3. 번역된 텍스트로 새 PDF 생성
        self.create_pdf(translated_texts, output_pdf)


# 사용 예시
if __name__ == "__main__":
    translator = PDFTranslator()
    
    # 입력/출력 파일 경로 설정
    input_file = "input.pdf"  # 번역할 영문 PDF
    output_file = "output_korean.pdf"  # 번역된 한글 PDF
    
    # PDF 번역 실행
    translator.translate_pdf(input_file, output_file)