USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_130_이익배분_일괄변경]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 이익배분 (UPDATE문으로 일괄 계산)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_110_이익배분_일괄변경]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_130_이익배분_일괄변경] 
AS
BEGIN

    SET NOCOUNT ON;   

    ----------------------------------------------------------------------
    -- 실습을 위한 테이블 생성 및 자료 입력 
    -- 임시적 사용을 위해 임시테이블로 생성함 
    ----------------------------------------------------------------------
    CREATE TABLE #이익 (                
        부서코드        NVARCHAR(10),
        이익금액합계    NUMERIC(18,0),
        매출금액합계    NUMERIC(18,0) DEFAULT 0)  

    CREATE TABLE #매출 (
        부서코드        NVARCHAR(10),
        담당자코드      NVARCHAR(10),
        매출금액        NUMERIC(18,0),
        이익금액        NUMERIC(18,0) DEFAULT 0)  -- 이익금액은 초기값 0

    INSERT INTO #이익 (부서코드, 이익금액합계) VALUES ('A1', 10000)
    INSERT INTO #이익 (부서코드, 이익금액합계) VALUES ('A2', 20000)

    INSERT INTO #매출 (부서코드, 담당자코드, 매출금액) VALUES ('A1', 'A1-1', 100000)
    INSERT INTO #매출 (부서코드, 담당자코드, 매출금액) VALUES ('A1', 'A1-2', 200000)
    INSERT INTO #매출 (부서코드, 담당자코드, 매출금액) VALUES ('A2', 'A2-1', 250000)
    INSERT INTO #매출 (부서코드, 담당자코드, 매출금액) VALUES ('A2', 'A2-2', 500000)

    ----------------------------------------------------------------------
    -- 매출금액합계 계산 (비율 분모로 사용하기 위해)
    -- [매출]테이블의 매출금액을 부서별로 집계 
    ----------------------------------------------------------------------
    UPDATE A SET 
           A.매출금액합계 = (SELECT ISNULL(SUM(X.매출금액),0)
                               FROM #매출 X 
                              WHERE X.부서코드 = A.부서코드)
      FROM #이익 A 

    ----------------------------------------------------------------------
    -- [이익금액]계산 
    -- WHERE 조건이 없기 때문에 #이익 테이블의 모든 행을 읽괄 처리 
    ----------------------------------------------------------------------
    UPDATE A SET 
           A.이익금액 = B.이익금액합계 * (A.매출금액 / B.매출금액합계)
      FROM #매출 A 
     INNER JOIN  #이익 B ON A.부서코드 = B.부서코드  

    ----------------------------------------------------------------------
    -- 최종 결과 출력 
    ----------------------------------------------------------------------
    SELECT A.부서코드, A.담당자코드, A.매출금액, A.이익금액,
           B.이익금액합계 
      FROM #매출 A 
     INNER JOIN #이익 B ON A.부서코드 = B.부서코드 
     ORDER BY A.부서코드, A.담당자코드 

END
GO
