USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_102_격리수준_UNCOMMITTED_세션2]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 격리수준 테스트를 위한 소스코드 (세션2)
            세션1을 먼저 실행하고 세션2를 실행 요망
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [SP09_102_격리수준_UNCOMMITTED_세션2]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_102_격리수준_UNCOMMITTED_세션2]
AS
BEGIN

    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED 

    SELECT 시간01 = CONVERT(CHAR, GETDATE(), 108)    

    SELECT A.*
      FROM 격리수준테스트 A 
     WHERE A.제품코드 = 'A' 

    SELECT 시간02 = CONVERT(CHAR, GETDATE(), 108)    

    SELECT A.*
      FROM 격리수준테스트 A (NOLOCK) 
     WHERE A.제품코드 = 'A' 

    SELECT 시간03 = CONVERT(CHAR, GETDATE(), 108)    

END
GO
