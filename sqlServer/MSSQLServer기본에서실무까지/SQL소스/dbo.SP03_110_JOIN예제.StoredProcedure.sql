USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP03_110_JOIN예제]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP03_110_JOIN예제]

----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP03_110_JOIN예제]
AS
BEGIN

    CREATE TABLE #테이블A (
        칼럼      NVARCHAR(30) 
       ,내용A     NVARCHAR(30)
    )

    CREATE TABLE #테이블B (
        칼럼      NVARCHAR(30) 
       ,내용B     NVARCHAR(30)
    )

    INSERT INTO #테이블A (칼럼, 내용A) VALUES ('1', 'A1내용') 
                                             ,('2', 'A2내용')
                                             ,('3', 'A3내용')

    INSERT INTO #테이블B (칼럼, 내용B) VALUES ('2', 'B2내용') 
                                             ,('3', 'B3내용')
                                             ,('4', 'B4내용')

    -- 1번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A 
      LEFT JOIN #테이블B B ON A.칼럼 = B.칼럼 

    -- 2번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
     INNER JOIN #테이블B B ON A.칼럼 = B.칼럼

    -- 3번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
     RIGHT JOIN #테이블B B ON A.칼럼 = B.칼럼
    
    -- 4번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
      LEFT JOIN #테이블B B ON A.칼럼 = B.칼럼
     WHERE B.칼럼 IS NULL
    
    -- 5번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
     RIGHT JOIN #테이블B B ON A.칼럼 = B.칼럼
     WHERE A.칼럼 IS NULL
    
    -- 6번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
      FULL JOIN #테이블B B ON A.칼럼 = B.칼럼
    
    -- 7번 문장                                              
    SELECT A.*, B.*
      FROM #테이블A A
      FULL JOIN #테이블B B ON A.칼럼 = B.칼럼
     WHERE A.칼럼 IS NULL OR B.칼럼 IS NULL


END   


GO
