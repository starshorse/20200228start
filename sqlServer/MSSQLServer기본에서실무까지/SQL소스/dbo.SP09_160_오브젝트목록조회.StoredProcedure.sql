USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_160_오브젝트목록조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: SP,트리거 등 각종 오브젝트 목록 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_160_오브젝트목록조회]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_160_오브젝트목록조회]  
AS
BEGIN

    SET NOCOUNT ON

    -- 프로시저, Function 목록 조회 
    SELECT *
      FROM INFORMATION_SCHEMA.ROUTINES 
     WHERE ROUTINE_TYPE IN ('PROCEDURE', 'FUNCTION')
    
    -- 시퀀스 목록 조회 
    SELECT 스키마명 = SCHEMA_NAME(A.SCHEMA_ID), A.*
      FROM SYS.SEQUENCES A (NOLOCK) 
    
    
    -- View 정보
    SELECT * 
      FROM INFORMATION_SCHEMA.VIEWS

END 
GO
