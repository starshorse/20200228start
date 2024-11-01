USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP03_240_재귀호출]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP03_240_재귀호출]

----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP03_240_재귀호출]
AS
BEGIN

    -- 숫자 순번 
    WITH Q AS 
           (SELECT 순번 = 1 
            UNION ALL 
            SELECT 순번 = 순번 + 1 
              FROM Q 
             WHERE 순번 < 3)
    SELECT * 
      FROM Q OPTION (MAXRECURSION 100);

    -- 날짜 순번 
    WITH Q AS 
           (SELECT 일자 = GETDATE() 
            UNION ALL 
            SELECT 일자 + 1 
              FROM Q 
             WHERE 일자 < GETDATE()+2)
    SELECT * 
      FROM Q OPTION (MAXRECURSION 100);

END   


GO
