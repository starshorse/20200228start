USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_102_격리수준_UNCOMMITTED_세션1]    Script Date: 2020-11-06 오전 9:47:42 ******/
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
EXEC [SP09_102_격리수준_UNCOMMITTED_세션1]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_102_격리수준_UNCOMMITTED_세션1]  
AS
BEGIN

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

        UPDATE A SET 
               A.수량       = 15
          FROM 격리수준테스트 A 
         WHERE A.제품코드   = 'A' 
           AND A.거래처코드 = 'A1'

        SELECT 시간03 = CONVERT(CHAR, GETDATE(), 108)

       WAITFOR DELAY '00:00:30'  -- 30초 지연 

    ROLLBACK TRAN    -- 작업을 취소 

    SELECT 시간04 = CONVERT(CHAR, GETDATE(), 108)

    SELECT A.*
      FROM 격리수준테스트 A 
     WHERE A.제품코드 = 'A' 

    SELECT 시간05 = CONVERT(CHAR, GETDATE(), 108)

END 
GO
