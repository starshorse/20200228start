USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_300_지금실행중인SP명및매개변수]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: 지금 실행하고 있는 SP명(오브젝트명) 및 매개변수 현황 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_300_지금실행중인SP명및매개변수] 
      @IN_입력문자 = 'ABC'
     ,@IN_입력숫자 = 10 


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_300_지금실행중인SP명및매개변수]  
      @IN_입력문자   NVARCHAR(100) 
     ,@IN_입력숫자   INT
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @지금실행오브젝트명 NVARCHAR(100)    

    SELECT @지금실행오브젝트명 = OBJECT_NAME(@@PROCID)

    -- 프로시저, Function 에서 사용된 매개변수 내역 조회 
    SELECT 스키마     = SCHEMA_NAME(SCHEMA_ID)
          ,오브젝트명 = A.NAME
          ,오브젝트종류 = A.TYPE_DESC 
          ,매개변수순서 = B.PARAMETER_ID
          ,매개변수이름 = CASE WHEN B.PARAMETER_ID = 0 THEN 'RETURNS' ELSE B.NAME END 
          ,매개변수타입 = TYPE_NAME(B.USER_TYPE_ID) 
          ,매개변수크기 = B.MAX_LENGTH
          ,INOUT구분    = B.IS_OUTPUT 
      FROM SYS.OBJECTS A
      LEFT JOIN SYS.PARAMETERS B ON A.OBJECT_ID = B.OBJECT_ID
     WHERE A.TYPE IN ('P','FN')
       AND A.NAME = @지금실행오브젝트명
    ORDER BY 스키마, A.NAME, B.PARAMETER_ID

END 
GO
