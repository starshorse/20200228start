USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_280_저장프로시저등변경관리]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 저장프로시저 등 변경 관리 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [SP08_280_저장프로시저등변경관리]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_280_저장프로시저등변경관리]  
AS
BEGIN
    CREATE TABLE DBO.프로그래밍로그 (
    	순번         BIGINT       IDENTITY(1,1) NOT NULL,
    	오브젝트명   NVARCHAR(100) NULL,
    	구분         NVARCHAR(20)  NULL,
    	스크립트     NVARCHAR(MAX) NULL,
    	수정로그인명 NVARCHAR(50)  NULL,
    	수정IP       NVARCHAR(50)  NULL,
    	수정호스트   NVARCHAR(50)  NULL,
    	수정프로그램 NVARCHAR(50)  NULL,
    	수정일시     DATETIME      NULL,
     PRIMARY KEY (순번)
    )

/* -- 아래 문장을 주석 제외 처리 하고 실행 요망 
    
    CREATE TRIGGER DBTRG_프로그래밍로그  ON DATABASE FOR
        CREATE_PROCEDURE, ALTER_PROCEDURE, DROP_PROCEDURE,
        CREATE_VIEW, ALTER_VIEW, DROP_VIEW,
        CREATE_FUNCTION, ALTER_FUNCTION, DROP_FUNCTION,
        CREATE_TRIGGER, ALTER_TRIGGER, DROP_TRIGGER
    AS BEGIN  
        DECLARE @DATA XML
    
        SET @DATA = EVENTDATA()
    
        INSERT INTO DBO.프로그래밍로그 (오브젝트명, 구분, 스크립트, 수정로그인명, 수정IP, 수정호스트, 수정프로그램, 수정일시)
        SELECT 오브젝트명   = @DATA.value('(/EVENT_INSTANCE/ObjectName)[1]', 'NVARCHAR(100)')
              ,구분         = @DATA.value('(/EVENT_INSTANCE/EventType)[1]',  'NVARCHAR(100)') 
              ,스크립트     = @DATA.value('(/EVENT_INSTANCE/TSQLCommand/CommandText)[1]', 'NVARCHAR(MAX)')
              ,수정로그인명 = S.LOGINAME
              ,수정IP       = C.CLIENT_NET_ADDRESS
              ,수정호스트   = S.HOSTNAME 
              ,수정프로그램 = S.PROGRAM_NAME
              ,수정일시     = GETDATE()
         FROM SYS.SYSPROCESSES S, SYS.DM_EXEC_CONNECTIONS C 
        WHERE S.SPID = C.SESSION_ID
          AND S.SPID = @@SPID
    
    END
*/

END


GO
