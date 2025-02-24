USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_290_테이블LOCK환경설정]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 테이블의 LOCK 환경 설정 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_290_테이블LOCK환경설정]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_290_테이블LOCK환경설정]
AS
BEGIN

    IF OBJECT_ID(N'테스트테이블', 'U') IS NOT NULL DROP TABLE 테스트테이블 

    -- ALLOW_PAGE_LOCKS 을 OFF시킴 
    CREATE TABLE 테스트테이블 (
        제품코드   NVARCHAR(30)  NOT NULL 
       ,거래처코드 NVARCHAR(30)  NOT NULL 
       ,수량       NUMERIC(18,0)
       ,CONSTRAINT [PK_테스트테이블] 
        PRIMARY KEY CLUSTERED ([제품코드], 거래처코드) 
        WITH (ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = OFF) ON [PRIMARY]
    ) 

    -- PK를 강제로 제거함 
    IF OBJECT_ID(N'PK_격리수준테스트') IS NOT NULL BEGIN
        ALTER TABLE [격리수준테스트] DROP CONSTRAINT [PK_격리수준테스트] 
    END 

    -- PK를 추가로 생성함 
    -- LOCK잠금 정확한 테스트를 위해 PAGE_LOCK을 허용하지 않는 PK 생성 
    ALTER TABLE [격리수준테스트] ADD CONSTRAINT [PK_격리수준테스트] 
        PRIMARY KEY CLUSTERED ([제품코드], 거래처코드) 
        WITH (ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = OFF) ON [PRIMARY]

    -- 인덱스는 OBJECT_ID() 로 확인이 어려워 #인덱스목록테이블 생성 
    CREATE TABLE #인덱스목록 (
        인덱스명   NVARCHAR(100)
       ,인덱스내용 NVARCHAR(MAX)
       ,인덱스키   NVARCHAR(1000)
    )

    -- 인덱스목록을 저장 : EXEC SP_HELPINDEX [테이블명]
    INSERT INTO #인덱스목록 
    EXEC SP_HELPINDEX [격리수준테스트]

   -- 인덱스 존재하면 인덱스 제거 
     IF EXISTS (SELECT * FROM #인덱스목록 WHERE 인덱스명 = '[격리수준테스트_IDX1]') BEGIN 
        DROP INDEX [격리수준테스트_IDX1] ON [격리수준테스트]
    END 

    -- INDEX에서도 ALLOW_PAGE_LOCKS 을 해제 할 수 있는 옵션이 설정 된다  
    CREATE  INDEX [격리수준테스트_IDX1] ON [격리수준테스트] (거래처코드) 
           WITH (ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = OFF)

END

GO
