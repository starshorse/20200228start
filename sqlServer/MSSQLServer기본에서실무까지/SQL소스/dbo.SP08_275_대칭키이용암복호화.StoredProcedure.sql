USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_275_대칭키이용암복호화]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 12일 
  작 성 자: 김정현
  기    능: 대칭키이용 암복호화 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [SP08_275_대칭키이용암복호화]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_275_대칭키이용암복호화]  
AS
BEGIN
    DECLARE @TXT_SQL    NVARCHAR(MAX)

    ----------------------------------------------------
    -- 1. 테스트를 위해 두개의 DB를 생성 한다 
    ----------------------------------------------------

    -- USE 명령을 SP에서 사용할 수 없어 소스를 변수에 저장후 EXEC 실행 
    SET @TXT_SQL = '
                    USE master;

                    CREATE DATABASE DB_원본;
                    CREATE DATABASE DB_복사;     
                   '
    
    EXEC SP_EXECUTESQL @TXT_SQL

    ----------------------------------------------------
    -- 2. DB_원본  대칭키 생성 및 암호화 데이터 INSERT 
    ----------------------------------------------------
    SET @TXT_SQL = '
                    USE DB_원본; 
                    
                    -- 원본 대칭키 생성 
                    CREATE SYMMETRIC KEY SKEY WITH ALGORITHM = AES_256,
                           IDENTITY_VALUE = "20200312",
                           KEY_SOURCE = "20200312_KEY SOURCE"
                           ENCRYPTION BY PASSWORD = "1234";
                    
                    -- 반드시 OPEN 해야 함 
                    OPEN SYMMETRIC KEY SKEY DECRYPTION BY PASSWORD = "1234";
                    
                    -- 생성된 대칭키 내역 및 오픈되어있는 키 조회 
                    SELECT * FROM SYS.SYMMETRIC_KEYS;
                    SELECT * FROM SYS.OPENKEYS;
                    
                    -- 암호화된 자료 저장을 위한 테이블 생성 
                    CREATE TABLE 원본테이블 (
                           암호화자료   VARBINARY(MAX)
                    )
                    
                    -- 원본테이블에 암호화 데이터 INSERT 
                    INSERT INTO 원본테이블 (암호화자료) 
                                    VALUES (ENCRYPTBYKEY(KEY_GUID("SKEY"), N"비밀문서 입니다!"));
                    
                    -- 원본테이블에 암호화 데이터 INSERT (추가1건, 암호화 값이 위와 다르다) 
                    INSERT INTO 원본테이블 (암호화자료) 
                                    VALUES (ENCRYPTBYKEY(KEY_GUID("SKEY"), N"비밀문서 입니다!"));

                    -- 암호화된 데이터 조회 
                    SELECT 암호화자료  
                          ,복호화자료 = CONVERT(NVARCHAR, DECRYPTBYKEY(암호화자료)) 
                      FROM 원본테이블;
                    
                    -- 대칭키 CLOSE 
                    CLOSE SYMMETRIC KEY SKEY;
                  '
    -- 작은따옴표(')를 입력하기 어려워 큰따옴표(")로 대치한 것을 다시 원상 복귀 처리 
    SET @TXT_SQL = REPLACE(@TXT_SQL, '"', '''')

    EXEC SP_EXECUTESQL @TXT_SQL
    
    
    -------------------------------------------------------------------------
    -- 3. DB_복사  대칭키 생성 및 암호화된 원복 테이블 복사 후 복호화 
    -------------------------------------------------------------------------
    SET @TXT_SQL = '
                    USE DB_복사; 
                     
                    -- 원본 데이터를 복사할 테이블 생성 
                    CREATE TABLE 복사테이블 (
                           암호화자료   VARBINARY(MAX)
                    )
                    
                    -- 원본 데이터를 복사 테이블에 INSERT 
                    INSERT INTO 복사테이블 (암호화자료) 
                    SELECT 암호화자료 
                      FROM DB_원본.DBO.원본테이블;
                    
                    -- 복사본 대칭키 생성 (원본과 ALGORITHM, IDENTITY_VALUE, KEY_SOURCE 동일 해야 함)
                    CREATE SYMMETRIC KEY SKEY2 WITH ALGORITHM = AES_256,
                           IDENTITY_VALUE = "20200312",
                           KEY_SOURCE = "20200312_KEY SOURCE"
                           ENCRYPTION BY PASSWORD = "9876";

                    -- 반드시 OPEN 해야 함 
                    OPEN SYMMETRIC KEY SKEY2 DECRYPTION BY PASSWORD = "9876";
                    
                    -- 대칭키 현황 및 오픈되어 있는 키 조회 
                    SELECT * FROM SYS.SYMMETRIC_KEYS;
                    SELECT * FROM SYS.OPENKEYS;
                    
                    -- 복사테이블에 암호화 데이터 1건 더 INSERT 
                    INSERT INTO 복사테이블 (암호화자료) 
                                    VALUES (ENCRYPTBYKEY(KEY_GUID("SKEY2"), N"복사본 추가 비밀문서!"));

                    -- 암호화된 데이터 조회 
                    SELECT 암호화자료  
                          ,복호화자료 = CONVERT(NVARCHAR, DECRYPTBYKEY(암호화자료)) 
                      FROM 복사테이블;
                    
                    -- 대칭키 CLOSE 
                    CLOSE SYMMETRIC KEY SKEY2;
                   ' 

    -- 작은따옴표(')를 입력하기 어려워 큰따옴표(")로 대치한 것을 다시 원상 복귀 처리 
    SET @TXT_SQL = REPLACE(@TXT_SQL, '"', '''')

    EXEC SP_EXECUTESQL @TXT_SQL
    
    -------------------------------------------------------------------------
    -- 4. 테스트 완료 후 데이터베이스 제거 
    -------------------------------------------------------------------------
    SET @TXT_SQL = '
                    USE MASTER; 
                    
                    DROP DATABASE DB_원본;
                    DROP DATABASE DB_복사;
                   '
    EXEC SP_EXECUTESQL @TXT_SQL

END
    
GO
