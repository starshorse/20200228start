USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_213_트리거_입력수정삭제통합]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 2월 13일 
  작 성 자: 김정현
  기    능: 트리거 INSERT,UPDATE,DELETE 통합처리 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_213_트리거_입력수정삭제통합]
 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_213_트리거_입력수정삭제통합]
AS
BEGIN
    

    IF OBJECT_ID(N'TRG_제품_입력수정삭제통합', 'TR') IS NOT NULL DROP TRIGGER TRG_제품_입력수정삭제통합  

    IF OBJECT_ID(N'제품',     'U') IS NOT NULL DROP TABLE 제품
    IF OBJECT_ID(N'제품이력', 'U') IS NOT NULL DROP TABLE 제품이력 
    
    CREATE TABLE 제품 (
        제품코드   NVARCHAR(30)
       ,제품명     NVARCHAR(100)
    )

    CREATE TABLE 제품이력 (
        제품코드   NVARCHAR(30)
       ,제품명     NVARCHAR(100)
       ,순번       BIGINT         IDENTITY(1, 1) 
       ,처리시간   DATETIME       DEFAULT GETDATE()
       ,처리구분   NVARCHAR(30)
    )


    DECLARE @TXT_쿼리    NVARCHAR(2000)

    -- UPDATE는 내부적으로 기존데이터를 DELETE 후 변경데이터를 INSERT 처리 한다  
    SET @TXT_쿼리 = 'CREATE TRIGGER [제품_TRG_입력수정삭제] ON [제품] AFTER INSERT, UPDATE, DELETE 
                      AS BEGIN 
                               
                          SET NOCOUNT ON;
                          
                          DECLARE @UPDATE여부  INT = 0 
                          
                          IF EXISTS (SELECT * FROM INSERTED) AND EXISTS (SELECT * FROM DELETED) SET @UPDATE여부 = 1

                          INSERT INTO 제품이력 (제품코드, 제품명, 처리구분) 
                          SELECT A.제품코드, A.제품명, IIF(@UPDATE여부 = 1, ''수정_변경전'', ''삭제'') 
                            FROM DELETED A 
                          UNION ALL 
                          SELECT A.제품코드, A.제품명, IIF(@UPDATE여부 = 1, ''수정_변경후'', ''입력'') 
                            FROM INSERTED A 
                    
                      END '

    EXEC (@TXT_쿼리) 

    -- 트리거테스트_TRG_입력수정삭제 트리거 수행 
    INSERT INTO 제품 (제품코드, 제품명) VALUES ('A', '사과')
    INSERT INTO 제품 (제품코드, 제품명) VALUES ('B', '포도'), ('C', '딸기')


    -- 트리거테스트_TRG_입력수정삭제 트리거 수행 
    UPDATE A SET 
           A.제품명 = '청포도'
      FROM 제품 A 
     WHERE A.제품코드 = 'B'

    -- 트리거테스트_TRG_입력수정삭제 트리거 수행 
    DELETE A 
      FROM 제품 A 
     WHERE A.제품코드 = 'C'

    SELECT A.*
      FROM 제품 A 

    SELECT A.*
      FROM 제품이력 A 

END   


GO
