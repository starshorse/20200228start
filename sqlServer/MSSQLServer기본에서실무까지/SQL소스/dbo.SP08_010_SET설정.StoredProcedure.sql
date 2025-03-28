USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_010_SET설정]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 자주 활용되는 SET 설정 예제 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_010_SET설정]
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_010_SET설정]
AS
BEGIN

    -- 처리된 행수를 표시 및 리턴하지 않는다 
    SET NOCOUNT ON

    -- 트랜잭션 격리수준을 READ UNCOMMITTED 로 변경 한다 
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    -- LOCK 때문에 해당시간 초과시 오류를 발생 함 (-1: 무한대기 1000:1초)
    SET LOCK_TIMEOUT 5000 


    -- 테이블이 존재하면 해당 테이블을 제거한다. [U]는 사용자테이블을 의미한다 
    IF OBJECT_ID(N'SET테스트테이블', 'U') IS NOT NULL DROP TABLE SET테스트테이블 

    -- 실습을 위해 테스트 테이블 생성 
    CREATE TABLE SET테스트테이블 (
        제품코드    NVARCHAR(30), 
        판매수량    NUMERIC(18, 0) 
    )

    INSERT INTO SET테스트테이블 (제품코드, 판매수량) 
                      VALUES ('A1', 100), ('A2', 200), ('A3', 300) 

    -- 특정테이블만  READ UNCOMMITTED로 읽으려면 (NOLOCK)을 추가 하면 된다 
    -- 다른 사용자가 수정하고 있더라도 LOCK 대기없이 읽을 수 있다 
    -- 단, 아직 완료되지 않은 변경사항도 반영되어 표시된다 
    SELECT A.제품코드, A.판매수량 
      FROM SET테스트테이블 A (NOLOCK) 
     WHERE A.제품코드 = 'A1' 

    -- 0으로 나누기 오류 발생을 제거하기 위한 SET 설정 
    SET ANSI_WARNINGS OFF
    SET ARITHIGNORE ON
    SET ARITHABORT OFF
    
    -- 0으로 나누면 오류 없이 NULL이 출력 
    SELECT [0나누기결과] = 100 / 0          

    -- 0으로 나누면 오류 없이 NULL -> 0으로 변경 출력 
    SELECT [0나누기결과] = ISNULL(100 / 0, 0)

END

GO
