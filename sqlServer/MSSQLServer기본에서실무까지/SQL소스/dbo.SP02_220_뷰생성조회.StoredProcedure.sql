USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_220_뷰생성조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 2월 13일 
  작 성 자: 김정현
  기    능: 뷰 생성 및 조회 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_220_뷰생성조회]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_220_뷰생성조회]
AS
BEGIN

    -- 이미 생성한 뷰가 있으면 먼저 제거한다 
    -- WITH SCHEMABINDING 옵션이 있으면 뷰를 먼저 제거해야 테이블이 제거된다    
    IF OBJECT_ID(N'VW_제품1', 'V') IS NOT NULL DROP VIEW VW_제품1
    IF OBJECT_ID(N'VW_제품2', 'V') IS NOT NULL DROP VIEW VW_제품2

    IF OBJECT_ID(N'제품', 'U') IS NOT NULL DROP TABLE 제품
    
    CREATE TABLE 제품 (
        제품코드   NVARCHAR(30)
       ,제품명     NVARCHAR(100)
       ,제품원가   NUMERIC(18, 0) 
       ,PRIMARY KEY (제품코드)
    )
    
    INSERT INTO 제품 (제품코드, 제품명, 제품원가) 
                      VALUES ('A1', '사과', 1000), 
                             ('A2', '포도', 2000),
                             ('B1', '호박', 3000)
    

    DECLARE @TXT_쿼리    NVARCHAR(2000)

    -- 뷰테이블 생성 : [VW_제품1] 
    -- WITH SCHEMABINDING : 뷰에 인덱스 생성 및 대상 테이블,칼럼을 제거하지 못하도록 제한 
    -- WITH ENCRYPTION    : 소스코드를 암호화 / 보안 강화 (반드시 소스 별도 보관 필요)
    SET @TXT_쿼리 = 'CREATE VIEW VW_제품1 -- WITH SCHEMABINDING, ENCRYPTION (암호화 주석처리)
                     AS 
                         SELECT A.제품코드, A.제품명
                           FROM dbo.제품 A 
                          WHERE A.제품코드 LIKE ''A%''    ' 
                      
    EXEC (@TXT_쿼리) -- @TXT_쿼리 변수에 저장된 문장을 실행 한다 

    -- 뷰테이블 생성 : [VW_제품2] 
    SET @TXT_쿼리 = 'CREATE VIEW VW_제품2 -- WITH SCHEMABINDING, ENCRYPTION (암호화 주석처리)
                     AS 
                         SELECT 제품그룹 = LEFT(A.제품코드, 1),
                                제품수   = COUNT(*),
                                평균원가 = AVG(A.제품원가) 
                           FROM dbo.제품 A 
                          GROUP BY LEFT(A.제품코드, 1) ' 
                      
    EXEC (@TXT_쿼리) -- @TXT_쿼리 변수에 저장된 문장을 실행 한다 

    -- [VW_제품1] 로 INSERT 수행 : 성공 (단일테이블, 집계함수 등이 없다) 
    INSERT INTO VW_제품1 (제품코드, 제품명) VALUES ('A3', '딸기') 

    -- [VW_제품1] 조회 : 일반테이블과 동일하게 조회 가능함 
    SELECT A.*  FROM [VW_제품1] A 


    -- [VW_제품2] 조회 : 일반테이블과 동일하게 조회 가능함 
    SELECT A.*  FROM [VW_제품2] A 

    -- [VW_제품2] 로 INSERT 수행 : 오류 발생 
    --INSERT INTO VW_제품2 (제품그룹, 제품수, 평균원가) VALUES ('B', 3, 1000) 


END   


GO
