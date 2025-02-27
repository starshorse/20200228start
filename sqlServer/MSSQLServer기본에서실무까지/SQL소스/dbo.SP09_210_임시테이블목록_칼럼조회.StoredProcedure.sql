USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_210_임시테이블목록_칼럼조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: 현재 사용중인 임시테이블 목록과 칼럼 목록 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_210_임시테이블목록_칼럼조회]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_210_임시테이블목록_칼럼조회]  
AS
BEGIN

    SET NOCOUNT ON

    CREATE TABLE #임시칼럼테스트 (
        제품코드   NVARCHAR(30) NOT NULL
       ,거래처코드 NVARCHAR(30) NOT NULL
       ,수량       NUMERIC(18,2)
       ,PRIMARY KEY (제품코드, 거래처코드) 
    )

    -- 현재 사용중인 임시테이블 목록 조회     
    SELECT 임시테이블명 = SUBSTRING(A.NAME, 1, CHARINDEX('___', A.NAME)-1),
           A.[OBJECT_ID], 
           B.USED_PAGE_COUNT, 
           B.ROW_COUNT
      FROM TEMPDB.SYS.TABLES A
     INNER JOIN TEMPDB.SYS.DM_DB_PARTITION_STATS B  ON A.[OBJECT_ID] = B.[OBJECT_ID]
     WHERE 1 = 1 
       AND A.NAME      LIKE '#%[_][_][_]%'
       AND B.INDEX_ID    IN (0,1)
       AND A.[OBJECT_ID] = OBJECT_ID('TEMPDB..' + SUBSTRING(A.NAME, 1, CHARINDEX('___', A.NAME)-1));


   -- 임시테이블의 칼럼 정보를 조회 (칼럼명: NAME)
   SELECT A.* 
     FROM TEMPDB.SYS.COLUMNS A
    WHERE OBJECT_ID = OBJECT_ID('TEMPDB..#임시칼럼테스트') 
    
END 
GO
