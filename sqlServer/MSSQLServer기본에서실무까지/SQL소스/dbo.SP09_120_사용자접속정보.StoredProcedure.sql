USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_120_사용자접속정보]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 사용자 접속 정보 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_120_사용자접속정보]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_120_사용자접속정보]  
AS
BEGIN

    SET NOCOUNT ON

    SELECT 세션번호     = S.SPID
         , 로그인명     = S.LOGINAME
         , 로그인일시   = CONVERT(NVARCHAR, S.LOGIN_TIME, 121)
         , 현재일시     = CONVERT(NVARCHAR, GETDATE(),    121)
         , 접속공인IP   = C.CLIENT_NET_ADDRESS
         , 접속호스트   = S.HOSTNAME 
         , 접속프로그램 = S.PROGRAM_NAME
    FROM SYS.SYSPROCESSES S, SYS.DM_EXEC_CONNECTIONS C 
    WHERE S.SPID = C.SESSION_ID
      AND S.SPID = @@SPID

END 
GO
