USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_150_매개변수기본값테스트]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 매개변수 기본값을 테스트 하기 위한 SP
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
DECLARE @OUT_결과코드     INT           -- 리턴값      저장변수
       ,@OUT_결과메세지   NVARCHAR(500) -- @OUT_메세지 저장변수 

EXEC @OUT_결과코드 = SP06_150_매개변수기본값테스트 
                     @IN_IP주소     = '11.22.31.41',
                     @IN_사용자코드 = 'A100',
                     @OUT_메세지    = @OUT_결과메세지 OUTPUT 

SELECT 결과코드   = @OUT_결과코드
      ,결과메세지 = @OUT_결과메세지 

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_150_매개변수기본값테스트]
(
   @IN_사용자코드        NVARCHAR(30)
  ,@IN_IP주소            NVARCHAR(30)  = '11.21.31.41'
  ,@OUT_메세지           NVARCHAR(500) OUTPUT
)
AS
BEGIN

    SET NOCOUNT ON;

    SELECT 사용자주소 = @IN_사용자코드 
          ,IP주소     = @IN_IP주소

    SET @OUT_메세지 = '처리완료' 
    RETURN(1)

END
GO
