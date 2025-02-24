USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_170_SUB3]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: SP에서 임시테이블 생성 및 활용 예제 (SUB3)
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
EXEC [dbo].[SP06_170_MAIN]  -- [SP06_170_MAIN]이 호출하여 실행됨 
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_170_SUB3]
AS
BEGIN

    SET NOCOUNT ON;

    -- 임시테이블 생성(#TEMP1)
    CREATE TABLE #TEMP1
    (일자   NVARCHAR(30),
     수량   NUMERIC(18,0)
    )
    
    INSERT INTO #TEMP1 (일자,     수량) 
                VALUES ('20200201', 20)

END
GO
