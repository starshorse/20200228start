USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP03_215_조건예제]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP03_215_조건예제]

----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP03_215_조건예제]
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

    SELECT A.제품코드
          ,[01월] = ISNULL(SUM(IIF(A.월 = '01', A.매출수량, 0)), 0)
          ,[02월] = ISNULL(SUM(IIF(A.월 = '02', A.매출수량, 0)), 0)
          ,[03월] = ISNULL(SUM(IIF(A.월 = '03', A.매출수량, 0)), 0)
      FROM #T매출 A                                                                
     WHERE A.년도 = '2020' 
     GROUP BY A.제품코드 
     ORDER BY A.제품코드 


    SELECT A.제품코드
          ,[01월] = ISNULL(SUM(CASE WHEN A.월 = '01' THEN A.매출수량 ELSE 0 END), 0)
          ,[02월] = ISNULL(SUM(CASE WHEN A.월 = '02' THEN A.매출수량 ELSE 0 END), 0)
          ,[03월] = ISNULL(SUM(CASE WHEN A.월 = '03' THEN A.매출수량 ELSE 0 END), 0)
      FROM #T매출 A                                                                
     WHERE A.년도 = '2020' 
     GROUP BY A.제품코드 
     ORDER BY A.제품코드 

END   


GO
