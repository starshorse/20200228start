USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_120_제품_수정_출력변수반환]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 제품코드 정보를 수정 (유형2: 출력변수로 결과리턴)
--------------------------------------------------------
  수정일    수정자    요청자    내용
--------------------------------------------------------
BEGIN TRAN  -- 트랜잭션 시작    

DECLARE @RETURN_VALUE     INT           -- 리턴값      저장변수
       ,@OUT_결과메세지   NVARCHAR(500) -- @OUT_메세지 저장변수 


EXEC @RETURN_VALUE  = [dbo].[SP06_120_제품_수정_출력변수반환]
      @IN_제품코드  = 'B3'      
     ,@IN_제품명    = '마늘'      
     ,@OUT_메세지   = @OUT_결과메세지  OUT 

SELECT 결과코드   = @RETURN_VALUE 
      ,결과메세지 = @OUT_결과메세지 

ROLLBACK TRAN  -- 또는 COMMIT TRAN 수행 
                           

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP06_120_제품_수정_출력변수반환]
(
   @IN_제품코드          NVARCHAR(30)
  ,@IN_제품명            NVARCHAR(100)
  ,@OUT_메세지           NVARCHAR(500)  OUTPUT
)
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
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A4', '복숭아')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('A5', '무화과')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B1', '당근')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B2', '양파')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B3', '고추')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B4', '감자')
    INSERT INTO #TB_제품 (제품코드, 제품명) VALUES ('B5', '도라지')
    
    -- 입력된 제품코드를 찾아서 제품명을 변경 한다 
    UPDATE A SET 
           A.제품명 = @IN_제품명 
      FROM #TB_제품 A 
     WHERE A.제품코드 = @IN_제품코드 

    -- 변경 작업이 정상적으로 실행되었는지를 체크 
    -- 정상적이면 @@ERROR = 0, @@ROWCOUNT = 1 이 된다. 
    -- 제품코드 한건만 수정시 @@ROWCOUNT=1 이다. 
    IF @@ERROR <> 0 OR @@ROWCOUNT <> 1 BEGIN 
        -- 오류가 발생하면 리턴값 99로 종료 
        SET @OUT_메세지 = '제품코드 UPDATE 오류'
        RETURN(99)
    END 
    
    -- 정상적이면 리턴값 1로 종료  
    SET @OUT_메세지 = '정상처리'
    RETURN(1)

END
GO
