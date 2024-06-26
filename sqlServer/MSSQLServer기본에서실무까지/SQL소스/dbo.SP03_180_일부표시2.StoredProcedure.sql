USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP03_180_일부표시2]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP03_180_일부표시2]

----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP03_180_일부표시2]
AS
BEGIN

    CREATE TABLE #T제품 (
        제품코드  NVARCHAR(30) 
       ,제품명    NVARCHAR(30)
    )

    INSERT INTO #T제품 (제품코드, 제품명) VALUES ('A2', '당근') 
                                                ,('A1', '사과') 
                                                ,('A4', '레몬')
                                                ,('A3', '포도')
                                                ,('A5', '양파')
                                                ,('A9', '상추')
                                                ,('A7', '감자')
                                                ,('A6', '고추')
                                                ,('A8', '버섯')

    SELECT A.제품코드, A.제품명 
      FROM #T제품 A 
     ORDER BY A.제품코드  
     OFFSET 3 ROWS                      -- OFFSET은 0부터 시작한다. (4번째값부터 조회) 

    SELECT A.제품코드, A.제품명 
      FROM #T제품 A 
     ORDER BY A.제품코드 
     OFFSET 3 ROWS                      -- OFFSET은 0부터 시작한다. (4번째값부터 조회) 
     FETCH NEXT 2 ROWS ONLY             -- 위의 사작값부터 2개행만 조회 (반드시 OFFSET 문장이 있어야 한다) 

END   


GO
