USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_211_트리거_삭제예제]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 2월 13일 
  작 성 자: 김정현
  기    능: 트리거 DELETE 처리 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_211_트리거_삭제예제]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_211_트리거_삭제예제]
AS
BEGIN
    
    IF OBJECT_ID(N'TRG_제품_삭제', 'TR') IS NOT NULL DROP TRIGGER TRG_제품_삭제 

    IF OBJECT_ID(N'제품',     'U') IS NOT NULL DROP TABLE 제품
    IF OBJECT_ID(N'제품이력', 'U') IS NOT NULL DROP TABLE 제품이력 
    
    CREATE TABLE 제품 (
        제품코드   NVARCHAR(30)
       ,제품명     NVARCHAR(100)
    )

    INSERT INTO 제품 (제품코드, 제품명) VALUES ('A', '사과')
    INSERT INTO 제품 (제품코드, 제품명) VALUES ('B', '포도'), ('C', '딸기')

    CREATE TABLE 제품이력 (
        제품코드   NVARCHAR(30)
       ,제품명     NVARCHAR(100)
       ,순번       BIGINT         IDENTITY(1, 1) 
       ,처리시간   DATETIME       DEFAULT GETDATE()
       ,처리구분   NVARCHAR(30)
    )

    DECLARE @TXT_쿼리    NVARCHAR(2000)

    SET @TXT_쿼리 = 'CREATE TRIGGER TRG_제품_삭제 ON [제품] AFTER DELETE 
                      AS BEGIN 
                              
                          INSERT INTO 제품이력 (제품코드, 제품명, 처리구분) 
                          SELECT A.제품코드, A.제품명, ''삭제'' 
                            FROM DELETED A 
                    
                      END '

    EXEC (@TXT_쿼리) 

    DELETE A 
      FROM 제품 A 
     WHERE A.제품코드 IN ('A', 'B')

    SELECT A.*
      FROM 제품 A 

    SELECT A.*
      FROM 제품이력 A 

END   


GO
