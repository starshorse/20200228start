USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_140_제품_조회_레코드셋]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 제품명으로 제품코드 내역을 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용
20200205    홍길동    조영식    소스코드를 정리함 
--------------------------------------------------------
EXEC [dbo].[SP06_140_제품_조회_레코드셋]
      @IN_제품명        = '도'    
     ,@IN_사용자코드    = 'A101'  
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_140_제품_조회_레코드셋]
   @IN_제품명           NVARCHAR(100)
  ,@IN_사용자코드       NVARCHAR(30)
AS
BEGIN

    SET NOCOUNT ON;

    -- 실습을 위한 임시테이블 생성 
    CREATE TABLE #TB_제품 (
        제품코드    NVARCHAR(30)
       ,제품명      NVARCHAR(100)
    )
     
    -- 실습을 위한 기본자료 입력 
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A1', '사과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A2', '포도')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A3', '모과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B4', '감자')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B5', '도라지')
    
    -- 처리결과를 저장할 임시테이블을 생성 한다 
    CREATE TABLE #TEMP_실행결과 ( 
        결과코드    INT 
       ,결과메세지  NVARCHAR(500)
    )

    -- 사용자권한 SP 호출후 레코드셋 결과를 INSERT문 저장
    INSERT INTO #TEMP_실행결과 (결과코드, 결과메세지) 
    EXEC [dbo].[SP06_140_사용자권한_레코드셋] 
               @IN_사용자코드 = @IN_사용자코드

    DECLARE @OUT_결과코드     INT           -- RETURN값    저장용
           ,@OUT_결과메세지   NVARCHAR(500) -- @OUT_메세지 저장용

    -- 임시테이블에 저장된 결과코드,메세지 값을 변수에 다시 저장
    SELECT @OUT_결과코드   = A.결과코드 
          ,@OUT_결과메세지 = A.결과메세지 
      FROM #TEMP_실행결과 A 

    -- 위의 SP 결과코드가 [1]이 아니면 더이상 진행하지 않고 중지함 
    IF @OUT_결과코드 <> 1 BEGIN 
        RETURN
    END 

    -- [@IN_제품명] 글자가 포함된 자료만 출력 한다 
    SELECT A.제품코드, A.제품명 
      FROM #TB_제품 A  
     WHERE A.제품명 LIKE '%' + @IN_제품명 + '%'

END
GO
