USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_160_SUB]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 임시테이블 생성 소멸 테스트 (SUB)
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
EXEC [SP06_160_MAIN]   -- MAIN 에서 호출되는 SP

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_160_SUB]
AS
BEGIN

    SET NOCOUNT ON;

    SELECT A.*
      FROM #TEMP1 A 

    CREATE TABLE #TEMP2 (
        칼럼2   NVARCHAR(30)
    )
    
    INSERT INTO #TEMP2 
       (칼럼2) VALUES ('456')

END
GO
