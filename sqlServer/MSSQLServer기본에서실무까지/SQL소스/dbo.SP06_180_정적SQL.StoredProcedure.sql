USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_180_정적SQL]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*----------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 동적SQL비교를 위한 정적SQL실행 SP 
------------------------------------------------------
EXEC [dbo].[SP06_180_정적SQL] @IN_처리구분 = 1 

------------------------------------------------------
  수정일    수정자    요청자    내용
 
------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_180_정적SQL]
    @IN_처리구분    INT  -- 1:DD집계 2:MM집계 3:YYYY집계 
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #TEMP1 (   -- 임시테이블(#TEMP1)
        일자   NVARCHAR(30),
        수량   NUMERIC(18,0)
    )

    INSERT INTO #TEMP1 VALUES ('20200101', 10)   
    INSERT INTO #TEMP1 VALUES ('20200102', 20)   
    INSERT INTO #TEMP1 VALUES ('20200203', 30)   
    INSERT INTO #TEMP1 VALUES ('20200201', 40)   
    INSERT INTO #TEMP1 VALUES ('20200302', 50)   
    INSERT INTO #TEMP1 VALUES ('20200303', 60)   

    IF @IN_처리구분 = 1 BEGIN 
        -- 일자별 집계 조회 
        SELECT DD       = RIGHT(A.일자, 2), 
               집계수량 = SUM(A.수량)  
          FROM #TEMP1 A          
         GROUP BY RIGHT(A.일자, 2)

    END ELSE IF @IN_처리구분 = 2 BEGIN 
        -- 월별 집계 조회 
        SELECT MM       = SUBSTRING(A.일자, 5, 2), 
               집계수량 = SUM(A.수량)  
          FROM #TEMP1 A          
         GROUP BY SUBSTRING(A.일자, 5, 2)

    END ELSE IF @IN_처리구분 = 3 BEGIN 
        -- 년별 집계 조회 
        SELECT YYYY     = LEFT(A.일자, 4), 
               집계수량 = SUM(A.수량)  
          FROM #TEMP1 A          
         GROUP BY LEFT(A.일자, 4)

    END ELSE BEGIN 
        RETURN  -- 1,2,3이 아니면 처리하지 않고 종료 
    END 

END
GO
