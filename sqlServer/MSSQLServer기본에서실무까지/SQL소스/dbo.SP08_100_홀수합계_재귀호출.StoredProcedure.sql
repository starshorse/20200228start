USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_100_홀수합계_재귀호출]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 홀수 합계 구하기 (재귀호출)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_100_홀수합계_재귀호출]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_100_홀수합계_재귀호출]
AS
BEGIN

    SET NOCOUNT ON;   

    WITH Q AS (SELECT 순번 = 1,
                      합계 = 1
                UNION ALL 
               SELECT 순번 = 순번 + 2, 
                      합계 = 합계 + (순번 + 2) 
                 FROM Q 
                WHERE 순번 < 100 - 1)
    SELECT * 
      FROM Q OPTION (MAXRECURSION 100);

END

GO
