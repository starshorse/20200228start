USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_110_조인유형]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 물리적 조인방식 테스트 
            [쿼리]탭 [통계포함]을 체크 후 실행 요망 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_110_조인유형]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_110_조인유형]  
AS
BEGIN

    CREATE TABLE #제품 (
        제품코드   NVARCHAR(30) NOT NULL
       ,제품명     NVARCHAR(100)
       ,PRIMARY KEY (제품코드) 
    )
    INSERT INTO #제품 (제품코드, 제품명) 
               VALUES ('A1', '사과'), ('A2','당근')

    CREATE TABLE #매출 (
        매출일자   NVARCHAR(30) NOT NULL
       ,제품코드   NVARCHAR(30) NOT NULL
       ,매출수량   NUMERIC(18, 0) 
       ,PRIMARY KEY (제품코드, 매출일자) 
    )
    INSERT INTO #매출 (매출일자, 제품코드, 매출수량)
               VALUES ('20200101', 'A3', 10)
                     ,('20200102', 'A2', 20)
                     ,('20200105', 'A1', 30)

    -- 해시조인 
    SELECT A.제품코드, B.제품명, A.매출수량
      FROM #매출 A
     INNER JOIN #제품 B ON A.제품코드  = B.제품코드
    OPTION (HASH JOIN)

    -- 머지조인
    SELECT A.제품코드, B.제품명, A.매출수량
      FROM #매출 A
     INNER JOIN #제품 B ON A.제품코드  = B.제품코드
    OPTION (MERGE JOIN)
    
    -- 중첩루프조인 
    SELECT A.제품코드, B.제품명, A.매출수량
      FROM #매출 A
     INNER JOIN #제품 B ON A.제품코드  = B.제품코드
    OPTION (LOOP JOIN)

END 
GO
