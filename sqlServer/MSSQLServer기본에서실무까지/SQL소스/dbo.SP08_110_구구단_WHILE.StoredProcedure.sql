USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_110_구구단_WHILE]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 구구단 (WHILE문 사용)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_110_구구단_WHILE]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_110_구구단_WHILE]
AS
BEGIN

    SET NOCOUNT ON;   

    -- 결과 저장을 위해 임시테이블을 생성한다 
    CREATE TABLE #결과 (
        단수        INT,
        반복        INT 
    )

    DECLARE @단수      INT = 2,
            @반복      INT = 1

    WHILE (@단수 <= 9) BEGIN 

        SET @반복 = 1 

        WHILE (@반복 <= 9) BEGIN 

            INSERT INTO #결과 (단수, 반복) VALUES (@단수, @반복) 

            SET @반복 = @반복 + 1 

        END 

        SET @단수 = @단수 + 1 
    END 

    SELECT A.단수, A.반복, 
           결과 = A.단수 * A.반복 
      FROM #결과 A 
     ORDER BY A.단수, A.반복 


END
GO
