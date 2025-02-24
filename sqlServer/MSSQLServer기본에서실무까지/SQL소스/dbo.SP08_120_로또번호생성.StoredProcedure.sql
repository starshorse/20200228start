USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_120_로또번호생성]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 01월 26일 
  작 성 자: 김정현
  기    능: 로또번호 새성 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_120_로또번호생성]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_120_로또번호생성]   
AS
BEGIN
    SET NOCOUNT ON;   

    DECLARE @난수시작값  INT = 1   -- 난수생성범위 시작 
           ,@난수종료값  INT = 45  -- 난수생성범위 종료 
           ,@로또번호    INT       -- 난수발생값 
    
    CREATE TABLE #결과 (          -- 결과를 입력하기 위한 임시테이블 
        순번       INT  IDENTITY(1, 1),
        로또번호   INT
    )
    
    DECLARE @순번  INT = 1
    
    WHILE (@순번 <= 6) BEGIN 

         -- 난수생성범위를 기준으로 난수 생성       
         SET @로또번호 = ROUND( ( (@난수종료값  + 1) - @난수시작값  ) * RAND() + @난수시작값  , 0, 1)

         -- 중복된 난수가 나오면 아래를 더이상 처리하지 않고 다시 올라간다 
         IF EXISTS (SELECT *  FROM #결과  WHERE 로또번호 = @로또번호)   CONTINUE  
         
        INSERT INTO #결과 (로또번호) VALUES (@로또번호) -- 결과를 로또임시테이블에 INSERT
        
        SET @순번 = @순번 + 1                           -- 몇번을 하였는지를 누적    

    END 

    SELECT A.*                                          -- 결과 표시 (숫자를 뽑은 순으로 표시) 
      FROM #결과 A 
     WHERE 1 = 1 
     ORDER BY A.순번 

END
GO
