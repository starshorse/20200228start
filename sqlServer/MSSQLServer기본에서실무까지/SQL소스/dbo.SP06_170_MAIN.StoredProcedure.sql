USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_170_MAIN]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: SP에서 임시테이블 생성 및 활용 예제 (MAIN)
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
EXEC [dbo].[SP06_170_MAIN]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_170_MAIN]
AS
BEGIN

    SET NOCOUNT ON;

    -- 임시테이블 생성(#TEMP1)
    CREATE TABLE #TEMP1
    (일자   NVARCHAR(30),
     수량   NUMERIC(18,0)
    )
    
    -- [SUB1] SP호출 : [#TEMP1]에 1건 INSERT 1건 수행 
    EXEC [SP06_170_SUB1]
    
    -- 임시테이블 #TEMP1 출력 
    SELECT A.* 
      FROM #TEMP1 A 
    
    -- [SUB2] SP호출 : [#TEMP2] 생성 및 에 INSERT 수행 
    EXEC [SP06_170_SUB2] 
    
    -- [SUB2] SP호출 : 동일SP 두번 호출 
    EXEC [SP06_170_SUB2] 

    -- 임시테이블 #TEMP2 출력 
    SELECT A.* FROM #TEMP2 A 
   
    -- [SUB3] SP호출 실행 : [#TEMP1] 생성 및 INSERT 수행 
    EXEC [SP06_170_SUB3] 
    
    -- 임시테이블 #TEMP1 출력 
    SELECT A.*
      FROM #TEMP1 A 

END
GO
