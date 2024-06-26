USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_500_DB사용률조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: 시스템 사용률 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_500_DB사용률조회]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_500_DB사용률조회]  
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @현재MS  BIGINT

    SELECT @현재MS  = MS_TICKS 
      FROM SYS. DM_OS_SYS_INFO 
    
    SELECT TOP 1000 레코드번호
          ,시간  = DATEADD (MS , (@현재MS - [TIMESTAMP] ) * -1, GETDATE ()) 
          ,DB사용률
          ,기타사용률 = 100 - ( 시스템대기 + DB사용률) 
          ,전체사용률 = 100 - 시스템대기
    FROM (SELECT 레코드번호 = RECORD .value ('(./Record/@id)[1]', 'int')  
                ,시스템대기 = RECORD .value ('(./Record/SchedulerMonitorEvent/SystemHealth/SystemIdle)[1]' , 'int') 
                ,DB사용률   = RECORD .value ('(./Record/SchedulerMonitorEvent/SystemHealth/ProcessUtilization)[1]' , 'int')  
                ,[TIMESTAMP]
           FROM (SELECT TIMESTAMP 
                       ,RECORD = CONVERT(XML, RECORD) 
                   FROM SYS . DM_OS_RING_BUFFERS
                  WHERE RING_BUFFER_TYPE = 'RING_BUFFER_SCHEDULER_MONITOR'
                    AND RECORD        LIKE '%<SYSTEMHEALTH>%'
                 ) X
         ) A
    ORDER BY 레코드번호 DESC

END 
GO
