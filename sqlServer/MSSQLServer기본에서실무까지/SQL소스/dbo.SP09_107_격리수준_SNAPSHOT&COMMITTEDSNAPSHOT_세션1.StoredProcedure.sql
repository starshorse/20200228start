USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_107_격리수준_SNAPSHOT&COMMITTEDSNAPSHOT_세션1]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 격리수준 테스트를 위한 소스코드 (세션1)
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
SNAPSHOT은 DB 모드를 변경 하여야 한다. 
주의1: 아래 소스는 [TEST1] DB사용을 기준으로 작성됨 (필요시 변경 필요)
주의2: 다른 사용자가 접속되어 있으면 변경되지 않는다. 

-- READ_COMMITTED_SNAPSHOT + SNAPSHOT 트랜잭션 격리수준 설정  
ALTER DATABASE [TEST1] SET SINGLE_USER WITH ROLLBACK IMMEDIATE -- 단일사용자 모드 
ALTER DATABASE [TEST1] SET READ_COMMITTED_SNAPSHOT ON          -- READ_COMMITTED_SNAPSHOT 설정
ALTER DATABASE [TEST1] SET ALLOW_SNAPSHOT_ISOLATION ON         -- SNAPSHOT 설정 
ALTER DATABASE [TEST1] SET MULTI_USER                          -- 멀티사용자모드 

-- READ_COMMITTED_SNAPSHOT + SNAPSHOT 트랜잭션 격리수준 해제  
ALTER DATABASE [TEST1] SET SINGLE_USER WITH ROLLBACK IMMEDIATE -- 단일사용자 모드 
ALTER DATABASE [TEST1] SET READ_COMMITTED_SNAPSHOT OFF         -- READ_COMMITTED_SNAPSHOT 해제 
ALTER DATABASE [TEST1] SET ALLOW_SNAPSHOT_ISOLATION OFF        -- SNAPSHOT 해제 
ALTER DATABASE [TEST1] SET MULTI_USER                          -- 멀티사용자모드 



--------------------------------------------------------
-- 위의 내용을 참조하여 환경 구성 후 실행 요망 
--------------------------------------------------------
EXEC [SP09_107_격리수준_SNAPSHOT&COMMITTEDSNAPSHOT_세션1]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_107_격리수준_SNAPSHOT&COMMITTEDSNAPSHOT_세션1]  
AS
BEGIN
    SET TRANSACTION ISOLATION LEVEL SNAPSHOT

    IF OBJECT_ID(N'격리수준테스트', 'U') IS NOT NULL DROP TABLE 격리수준테스트
    
    CREATE TABLE 격리수준테스트 (
        제품코드   NVARCHAR(30) NOT NULL
       ,거래처코드 NVARCHAR(30) NOT NULL
       ,수량       NUMERIC(18,0)
    )

    -- LOCK잠금 정확한 테스트를 위해 PAGE_LOCK을 허용하지 않는 PK 생성 
    ALTER TABLE [격리수준테스트] ADD CONSTRAINT [PK_격리수준테스트] 
        PRIMARY KEY CLUSTERED ([제품코드], [거래처코드]) 
        WITH (ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = OFF) ON [PRIMARY]
    
    INSERT INTO 격리수준테스트 (제품코드, 거래처코드, 수량)
                        VALUES ('A', 'A1', 10)
                              ,('A', 'A2', 20)
                              ,('B', 'B1', 10)
                              ,('B', 'B2', 20)

    BEGIN TRAN 
    
       SELECT 시간01 = CONVERT(CHAR, GETDATE(), 108)  

       SELECT A.*
         FROM 격리수준테스트 A 
        WHERE A.제품코드 = 'A' 
        
       SELECT 시간02 = CONVERT(CHAR, GETDATE(), 108)  

       UPDATE A  
          SET A.수량 = 15
         FROM 격리수준테스트 A 
        WHERE A.제품코드   = 'A' 
          AND A.거래처코드 = 'A1'

       SELECT 시간03 = CONVERT(CHAR, GETDATE(), 108)  

       WAITFOR DELAY '00:00:30'  -- 30초 지연 

       SELECT 시간04 = CONVERT(CHAR, GETDATE(), 108)  

       SELECT A.*
         FROM 격리수준테스트 A 
        WHERE A.제품코드 = 'A' 

       SELECT 시간05 = CONVERT(CHAR, GETDATE(), 108)  

       DELETE A  
         FROM 격리수준테스트 A 
        WHERE A.제품코드   = 'A' 
          AND A.거래처코드 = 'A1'
   
    COMMIT TRAN    -- 작업 완료 

    SELECT 시간06 = CONVERT(CHAR, GETDATE(), 108)  

END 
GO
