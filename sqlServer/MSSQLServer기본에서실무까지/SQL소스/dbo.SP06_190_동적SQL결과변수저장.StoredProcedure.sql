USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_190_동적SQL결과변수저장]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*----------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 동적SQL에서 결과값을 변수로 전달 
------------------------------------------------------
EXEC [dbo].[SP06_190_동적SQL결과변수저장]

------------------------------------------------------
  수정일    수정자    요청자    내용
 
------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_190_동적SQL결과변수저장]
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #TEMP1 (   -- 임시테이블(#TEMP1)
        일자   NVARCHAR(30),
        수량   NUMERIC(18,0)
    )

    INSERT INTO #TEMP1 VALUES ('20200101', 10)   
    INSERT INTO #TEMP1 VALUES ('20200102', 20)   
    INSERT INTO #TEMP1 VALUES ('20200201', 30)   
    INSERT INTO #TEMP1 VALUES ('20200202', 40)   
    INSERT INTO #TEMP1 VALUES ('20200301', 50)   
    INSERT INTO #TEMP1 VALUES ('20200302', 60)   

    -- 관련 변수를 선언 
    DECLARE @TXT_SQL        NVARCHAR(2000)
           ,@NUM_결과수량   NUMERIC(18, 0) 

    -- 실행할 SELECT문장을 변수에 저장함 (@수량합계 변수에 결과저장)
    SET @TXT_SQL = 'SELECT @수량합계 = ISNULL(SUM(수량),0)
                           FROM #TEMP1 A  ' 

    -- 동적SQL 실행 
    EXEC SP_EXECUTESQL @TXT_SQL,                           -- 실제수행 SQL문장이 저장된 변수 
                       N'@수량합계 NUMERIC(18,0) OUTPUT',  -- @TXT_SQL에 있는 변수 선언 (OUTPUT)
                       @수량합계 = @NUM_결과수량 OUTPUT    -- 결과를 저장한 변수를 지정 (@NUM_결과수량)
        
    -- 동적SQL 실행을 통해 전달받은 결과수량을 출력  
    SELECT 결과수량 = @NUM_결과수량

END
GO
