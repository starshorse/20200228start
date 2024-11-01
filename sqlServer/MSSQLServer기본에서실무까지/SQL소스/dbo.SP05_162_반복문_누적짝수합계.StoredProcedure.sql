USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP05_162_반복문_누적짝수합계]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*-------------------------------------------------------------------
  작 성 일: 2020년 1월 16일 
  작 성 자: 김정현
  기    능: 반복문 (반복값이 짝수인 경우만 누적 처리)
---------------------------------------------------------------------
  수정일    수정자    요청자    내용
---------------------------------------------------------------------
실행명령어 : EXEC [dbo].[SP05_162_반복문_누적짝수합계]
 
---------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP05_162_반복문_누적짝수합계]
AS
BEGIN

    DECLARE @반복값  INT  -- 변수 선언 
           ,@누적값  INT  -- 변수 선언 
    
    SET @반복값 = 0 -- 반복 초기값 설정 
    SET @누적값 = 0 -- 누적값을 모두 비움 (0)

    --------------------------------------------------------
    -- @반복값이 10보다 작을때 까지 BEGIN ~ END 까지 반복 
    --------------------------------------------------------
    WHILE (@반복값 < 10)  BEGIN 

        SET @반복값 = @반복값 + 1 

        -- %는 나머지 값을 구하는 연산자 
        -- 2로 나누어 1이 나오면 홀수 이다 
        -- 홀수 이면 END 까지 실행하지 않고 WHILE 처음으로 이동
        IF @반복값 % 2 = 1 CONTINUE 

        SET @누적값 = @누적값 + @반복값

    END 

    --결과 출력 
    SELECT 반복값결과 = @반복값, 
           누적값결과 = @누적값 


END   


GO
