USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_210_트리거_입력예제]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 2월 13일 
  작 성 자: 김정현
  기    능: 트리거 INSERT 처리 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_210_트리거_입력예제]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_210_트리거_입력예제]
AS
BEGIN
    
    IF OBJECT_ID(N'TRG_제품_입력', 'TR') IS NOT NULL DROP TRIGGER TRG_제품_입력 

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

    SET @TXT_쿼리 = 'CREATE TRIGGER TRG_제품_입력 ON [제품] AFTER INSERT 
                      AS BEGIN 
                              
                          INSERT INTO 제품이력 (제품코드, 제품명, 처리구분) 
                          SELECT A.제품코드, A.제품명, ''입력'' 
                            FROM INSERTED A 
                    
                      END '

    EXEC (@TXT_쿼리) 

    INSERT INTO 제품 (제품코드, 제품명) VALUES ('A', '사과')
    INSERT INTO 제품 (제품코드, 제품명) VALUES ('B', '포도'), ('C', '딸기')

    SELECT A.*
      FROM 제품 A 

    SELECT A.*
      FROM 제품이력 A 

END   


GO
