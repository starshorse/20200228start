USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_160_MAIN]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 임시테이블 생성 소멸 테스트 (MAIN)
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
EXEC [SP06_160_MAIN]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_160_MAIN]
AS
BEGIN

    SET NOCOUNT ON;

    CREATE TABLE #TEMP1 (
        칼럼1   NVARCHAR(30)
    )
    
    INSERT INTO #TEMP1 
       (칼럼1) VALUES ('123')
    
    
    EXEC SP06_160_SUB
    
    SELECT A.*
      FROM #TEMP2 A 

END
GO
