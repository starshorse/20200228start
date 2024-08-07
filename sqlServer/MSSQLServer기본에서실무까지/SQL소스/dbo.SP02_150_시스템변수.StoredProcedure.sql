USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_150_시스템변수]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 시스템 변수 테스트 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_150_시스템변수]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_150_시스템변수]
AS
BEGIN

    -- T매출 테이블 생성 스크립트
    CREATE TABLE #T매출 (
        일자    NVARCHAR(08)
       ,제품    NVARCHAR(30)
       ,수량    NUMERIC(18,0) DEFAULT 0  NULL -- 기본값0설정
       ,PRIMARY KEY (일자, 제품)
    )

    SELECT 작업번호 = '1-1', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 

    -- 추가 
    INSERT INTO #T매출 (일자, 제품, 수량) 
        VALUES ('20200101', 'A1', 10)
             , ('20200102', 'A2', 20)
             , ('20200103', 'A3', 30)

    SELECT 작업번호 = '2-0', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 
    SELECT 작업번호 = '2-1', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 

    -- 수정
    UPDATE A SET 
           A.수량 = 15
      FROM #T매출 A 
     WHERE A.일자 = '20200101'
       AND A.제품 = 'A1'

    SELECT 작업번호 = '3-0', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 
    SELECT 작업번호 = '3-1', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 

    -- 삭제
    DELETE A
      FROM #T매출 A 
     WHERE A.일자 = '20200101'
       AND A.제품 = 'A4'

    SELECT 작업코드 = '4-0', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 
    SELECT 작업코드 = '4-1', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 

    -- 모든 자료 조회 
    SELECT A.*
      FROM #T매출 A 

    SELECT 작업코드 = '5-0', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 
    SELECT 작업코드 = '5-1', [ERROR] = @@ERROR, [ROWCOUNT] = @@ROWCOUNT 
    
END   


GO
