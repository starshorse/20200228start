USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_510_장시간실행SQL조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: 장시간실행 고비용 SQL 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_510_장시간실행SQL조회]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_510_장시간실행SQL조회]  
AS
BEGIN

    SET NOCOUNT ON

    SELECT TOP 10
           수행횟수       = A.EXECUTION_COUNT  
		  ,[수행시간(초)] = ROUND(A.LAST_WORKER_TIME / 1000000.0, 2)
	      ,SQL문장  = B.TEXT
      FROM SYS.DM_EXEC_QUERY_STATS A
     CROSS APPLY SYS.DM_EXEC_SQL_TEXT(A.SQL_HANDLE) B
	 WHERE A.LAST_EXECUTION_TIME >= DATEADD(SECOND, -30, GETDATE())
	 ORDER BY 2 DESC
     
END 
GO
