USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_180_동적SQL]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*----------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 동적SQL비교를 위한 동적SQL실행 SP 
------------------------------------------------------
EXEC [dbo].[SP06_180_동적SQL] @IN_처리구분 = 2

------------------------------------------------------
  수정일    수정자    요청자    내용
 
------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_180_동적SQL]
(
    @IN_처리구분    INT  -- 1:DD집계 2:MM집계 3:YYYY집계 
)

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

    DECLARE @TXT_쿼리문장   NVARCHAR(2000)
           ,@TXT_구분명     NVARCHAR(50)
           ,@TXT_그룹       NVARCHAR(50) 

    SET @TXT_쿼리문장 = 'SELECT <<구분명>>  = <<그룹>>, 
                                집계수량 = SUM(A.수량)  
                           FROM #TEMP1 A          
                          GROUP BY <<그룹>>    '

    IF @IN_처리구분 = 1 BEGIN           -- 일자별 조회 
        SET @TXT_구분명 = 'DD'
        SET @TXT_그룹   = 'RIGHT(A.일자, 2)'
    END ELSE IF @IN_처리구분 = 2 BEGIN  -- 월별 조회 
        SET @TXT_구분명 = 'MM'
        SET @TXT_그룹   = 'SUBSTRING(A.일자, 5, 2)'
    END ELSE IF @IN_처리구분 = 3 BEGIN  -- 년별 조회 
        SET @TXT_구분명 = 'YYYY'
        SET @TXT_그룹   = 'LEFT(A.일자, 4)'
    END ELSE BEGIN 
        RETURN  -- 1,2,3이 아니면 처리하지 않고 종료 
    END 

    SET @TXT_쿼리문장 = REPLACE(@TXT_쿼리문장, '<<구분명>>', @TXT_구분명)
    SET @TXT_쿼리문장 = REPLACE(@TXT_쿼리문장, '<<그룹>>',   @TXT_그룹)

    EXEC (@TXT_쿼리문장)  -- @TXT_쿼리문장 변수의 SQL문을 실행  

END
GO
