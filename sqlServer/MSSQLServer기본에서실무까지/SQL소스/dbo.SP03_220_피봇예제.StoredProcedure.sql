USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP03_220_피봇예제]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP03_220_피봇예제]

----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP03_220_피봇예제]
AS
BEGIN

    CREATE TABLE #T매출 (
        제품코드  NVARCHAR(30)
       ,년도      NVARCHAR(04) 
       ,월        NVARCHAR(02) 
       ,매출수량  NUMERIC(18, 0) 
    )


    INSERT INTO #T매출 (제품코드, 년도, 월, 매출수량) VALUES ('A1', '2020', '01', 10) 
                                                            ,('A2', '2020', '01', 20) 
                                                            ,('A2', '2020', '02', 30) 
                                                            ,('A2', '2020', '03', 40) 
                                                            ,('A2', '2021', '01', 50) 
    SELECT P.*
      FROM #T매출 A 
     PIVOT (SUM(A.매출수량) FOR A.월 IN ([01],[02],[03],[04],[05],[06],[07],[08],[09],[10],[11],[12])) P

    SELECT A.*
      FROM #T매출 A 


END   


GO
