USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_110_제품_조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 제품명으로 제품코드 내역을 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용
20200205    홍길동    조영식    소스코드를 정리함 
--------------------------------------------------------
EXEC [dbo].[SP06_110_제품_조회]         
      @IN_제품명        = '도'      
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_110_제품_조회]
(
   @IN_제품명           NVARCHAR(100)
)
AS
BEGIN

    SET NOCOUNT ON;

    -- 실습을 위한 임시테이블 생성 
    CREATE TABLE #TB_제품 (
        제품코드    NVARCHAR(30)
       ,제품명      NVARCHAR(100)
    )
     
    -- 실습을 위한 기본자료 입력 
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A1', '사과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A2', '포도')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A3', '모과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A4', '복숭아')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A5', '무화과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B1', '당근')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B2', '양파')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B3', '고추')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B4', '감자')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B5', '도라지')

    -- 입력되어 있는 제품코드 모두를 출력 한다 
    SELECT A.제품코드, A.제품명 
      FROM #TB_제품 A  
     ORDER BY A.제품코드 

    -- @IN_제품명의 글자가 포함된 자료만 출력 한다 
    SELECT A.제품코드, A.제품명 
      FROM #TB_제품 A  
     WHERE A.제품명 LIKE '%' + @IN_제품명 + '%'

END
GO
