USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_540_DB오류조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: DB 오류 조회 (트레이스 로그)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_540_DB오류조회]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_540_DB오류조회]  
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @PATH NVARCHAR(100)

    SELECT @PATH = PATH 
	  FROM SYS.TRACES 
	 WHERE IS_DEFAULT = 1

    SELECT 오류시간 = STARTTIME
	      ,오류번호 = ERROR
		  ,오류내용 = SUBSTRING(TEXTDATA,1,500) 
		  ,DB명     = SUBSTRING(DATABASENAME,1,50)
		  ,로그인명 = SUBSTRING(LOGINNAME,1,50) 
		  ,호스트명 = SUBSTRING(HOSTNAME,1,50)
		  ,시스템명 = SUBSTRING(APPLICATIONNAME,1,50)
          ,*
      FROM FN_TRACE_GETTABLE(@PATH, DEFAULT) 
     WHERE ISNULL(ERROR, 0) <> 0
     ORDER BY STARTTIME DESC


END 
GO
