USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_160_트랜잭션]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 트랜잭션 이해를 위한 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_160_트랜잭션]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_160_트랜잭션]
AS
BEGIN

    -- T매출 테이블 생성 스크립트
    CREATE TABLE #T매출 (
        일자    NVARCHAR(08)
       ,제품    NVARCHAR(30)
       ,수량    NUMERIC(18,0) DEFAULT 0  NULL -- 기본값0설정
       ,PRIMARY KEY (일자, 제품)
    )

    -- 기본 자료 등록 
    INSERT INTO #T매출 (일자, 제품, 수량) 
        VALUES ('20200101', 'A1', 10)
             , ('20200102', 'A2', 20)

    DECLARE @INT_실패여부  INT 

    SET @INT_실패여부 = 0 

    -- 트랜잭션 시작 --------------------------------------
    BEGIN TRAN      

    -- UPDATE 후 에러 및 처리건수를 체크하여 문제가 있으면 실패여부 1
    UPDATE A SET 
           A.수량 = 15
      FROM #T매출 A 
     WHERE A.일자 = '20200101'
       AND A.제품 = 'A1'

    IF @@ERROR <> 0 OR @@ROWCOUNT <> 1  SET @INT_실패여부 = 1 

    -- DELETE 후 에러 및 처리건수를 체크하여 문제가 있으면 실패여부 1
    DELETE A
      FROM #T매출 A 
     WHERE A.일자 = '20200105'
       AND A.제품 = 'A5'

    IF @@ERROR <> 0 OR @@ROWCOUNT <> 1  SET @INT_실패여부 = 1 

    -- 실패여부 변수에 따라 COMMIT 또는 ROLLBACK 처리 함 
    IF @INT_실패여부 = 0  BEGIN 
        COMMIT TRAN              -- 지금까지 작업한 것을 작업 완료 0
    END ELSE BEGIN 
        ROLLBACK TRAN            -- 지금까지 작업한 것을 모두 취소 
    END 

    -- 모든 자료를 조회 
    SELECT A.*
      FROM #T매출 A 
    
END   


GO
