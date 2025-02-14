USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP05_110_시퀀스32]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 1월 12일 
  작 성 자: 김정현
  기    능: 시퀀스32
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP05_110_시퀀스32]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP05_110_시퀀스32]
AS
BEGIN

    -- [시퀀스32] 존재 하면 기존 시퀀스를 제거 한다 
    IF OBJECT_ID(N'[dbo].[시퀀스32]', 'SO') IS NOT NULL DROP SEQUENCE 시퀀스32 

    -- 시퀀스를 새로이 생성 한다 
    CREATE SEQUENCE 시퀀스32  
        INCREMENT BY 2;

    -- 시퀀스 번호를 10개 화면에 표시 한다 (칼럼이름을 [순번]으로 지정)
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 
    SELECT 순번 = NEXT VALUE FOR 시퀀스32 

    -- 현재 캐시값과 현재(최근) 시퀀스값 조회 
    SELECT 캐시크기     = CACHE_SIZE, 
           현재시퀀스값 = CURRENT_VALUE   
      FROM SYS.SEQUENCES  
     WHERE NAME = '시퀀스32' 

END   


GO
