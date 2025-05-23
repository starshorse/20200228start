USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_521_SPID별상태조회_SQL]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: SPID별상태조회를 위한 SQL 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_521_SPID별상태조회_SQL]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_521_SPID별상태조회_SQL]  
AS
BEGIN

    SET NOCOUNT ON

    -- 세션별 LOCK 및 실행 프로그램, 서버 사용량 등을 조회 할 수 있다 
    -- BLOCKING_SESSION_ID이 0보다 큰경우 실행 대기 상태로 속도 저하 문제 발생 
    SELECT A.SESSION_ID       ,A.[STATUS]               ,A.LOGIN_NAME 
          ,A.[HOST_NAME]      ,B.BLOCKING_SESSION_ID    ,B.WAIT_TIME 
          ,B.WAIT_TYPE        ,B.LAST_WAIT_TYPE         ,B.PERCENT_COMPLETE 
          ,B.COMMAND          ,A.CPU_TIME               ,B.REQUEST_ID 
          ,A.[PROGRAM_NAME]   ,DBNAME = DB_NAME(B.DATABASE_ID) 
          ,격리수준 = CASE WHEN A.TRANSACTION_ISOLATION_LEVEL = 0 THEN 'UNSPECIFIED' 
                           WHEN A.TRANSACTION_ISOLATION_LEVEL = 1 THEN 'READUNCOMMITTED' 
                           WHEN A.TRANSACTION_ISOLATION_LEVEL = 2 THEN 'READCOMMITTED' 
                           WHEN A.TRANSACTION_ISOLATION_LEVEL = 3 THEN 'REPEATABLE' 
                           WHEN A.TRANSACTION_ISOLATION_LEVEL = 4 THEN 'SERIALIZABLE' 
                           WHEN A.TRANSACTION_ISOLATION_LEVEL = 5 THEN 'SNAPSHOT'   END 
          ,디스크IO       = A.READS + A.WRITES
          ,마지막실행시간 = A.LAST_REQUEST_END_TIME
          ,오브젝트명     = OBJECT_NAME(D.OBJECTID)
          ,최근SQL        = D.[TEXT] 
     FROM SYS.DM_EXEC_SESSIONS          A
     LEFT JOIN SYS.DM_EXEC_REQUESTS     B ON B.SESSION_ID = A.SESSION_ID 
     LEFT JOIN SYS.DM_EXEC_CONNECTIONS  C ON C.SESSION_ID = A.SESSION_ID 
    OUTER APPLY SYS.DM_EXEC_SQL_TEXT(C.MOST_RECENT_SQL_HANDLE) D 
    WHERE A.IS_USER_PROCESS = 1

END 
GO
