USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_141_사용자권한_출력변수]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 사용자코드가 [A]로 시작하는 사용자만 권한 승인(1)  
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
DECLARE @OUT_결과코드     INT           -- 리턴값      저장변수
       ,@OUT_결과메세지   NVARCHAR(500) -- @OUT_메세지 저장변수 

EXEC @OUT_결과코드  = [SPA06_141_사용자권한_출력변수]
                       @IN_사용자코드 = 'C100'
                      ,@OUT_메세지    = @OUT_결과메세지 OUTPUT 

SELECT 결과코드   = @OUT_결과코드
      ,결과메세지 = @OUT_결과메세지 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_141_사용자권한_출력변수]
   @IN_사용자코드        NVARCHAR(30)
  ,@OUT_메세지           NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF LEFT(@IN_사용자코드, 1) = 'A' BEGIN 
        -- 사용자코드 첫글자가 [A]이면 승인(1)
        SET @OUT_메세지 = '숭인' 
        RETURN(1) 
    END ELSE BEGIN 
        -- 사용자코드 첫글자가 [A]가 아니면 불가(9)
        SET @OUT_메세지 = '미승인' 
        RETURN(9) 
    END 

END
GO
