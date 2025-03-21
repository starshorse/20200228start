USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_270_단방향암호화]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 03월 12일 
  작 성 자: 김정현
  기    능: 단방향 암호화 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [SP08_270_단방향암호화]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_270_단방향암호화]  
AS
BEGIN
    ----------------------------------------------------
    -- PwdEncrypt
    ----------------------------------------------------

    DECLARE @암호변환값 VARBINARY(MAX) 

    -- ABC를 단방향 암호화 수행 (동일글자도 실행시 마다 다른값 리턴) 
    SET @암호변환값 =  PWDENCRYPT('ABC') 
    
    -- PWDCOMPARE 결과 : 1(일치), 0(불일치) 
    SELECT 암호이진값 = @암호변환값
          ,비교결과   = PWDCOMPARE('ABCD', @암호변환값)

    -- ABC를 단방향 암호화 수행 (동일글자도 실행시 마다 다른값 리턴) 
    SET @암호변환값 =  PWDENCRYPT('ABC') 

    SELECT 암호문자변환값 = MASTER.DBO.FN_VARBINTOHEXSTR(@암호변환값)
          ,비교결과   = PWDCOMPARE('ABC',  @암호변환값)

    ----------------------------------------------------
    -- HASHBYTES
    ----------------------------------------------------
    -- MD2, MD4, SHA, SHA1, SHA2_256, SHA2_512 를 선택 가능 
    ----------------------------------------------------
    DECLARE @HASH변환값 VARBINARY(MAX) 

    -- SHA_256 으로 ABC 단방향 암호화 
    SET @HASH변환값 = HASHBYTES('SHA2_256', 'ABC');

    -- 결과 조회 
    SELECT HASH변환이진값 = @HASH변환값

    -- SHA_256 으로 ABC 단방향 암호화 
    SET @HASH변환값 = HASHBYTES('SHA2_256', 'ABC');

    -- 결과 조회 
    SELECT HASH변환이진값 = MASTER.DBO.FN_VARBINTOHEXSTR(@HASH변환값)


END
    
GO
