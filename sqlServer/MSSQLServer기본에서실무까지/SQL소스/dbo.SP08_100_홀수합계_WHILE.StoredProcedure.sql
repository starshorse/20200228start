USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_100_홀수합계_WHILE]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 홀수 합계 구하기 (WHILE문활용)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_100_홀수합계_WHILE]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_100_홀수합계_WHILE]
AS
BEGIN

    SET NOCOUNT ON;   

    -- 결과 저장을 위해 임시테이블을 생성한다 
    CREATE TABLE #결과 (
        순번        INT,
        합계        INT 
    )

    DECLARE @순번      INT = 1,
            @합계      INT = 0

    WHILE (@순번 < 100) BEGIN 

        SET @합계 = @합계 + @순번

        INSERT INTO #결과 (순번, 합계) VALUES (@순번, @합계) 

        SET @순번 = @순번 + 2  -- 2씩 증가  

    END 

    SELECT A.순번, A.합계
      FROM #결과 A 
     ORDER BY 1 

END

GO
