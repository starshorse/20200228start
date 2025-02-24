USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP05_100_시퀀스10]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2020년 1월 12일 
  작 성 자: 김정현
  기    능: 시퀀스10 - 기본 형식
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP05_100_시퀀스10]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP05_100_시퀀스10]
AS
BEGIN

    -- [시퀀스10]이 존재 하면 기존 [시퀀스10]을 제거 한다 
    IF OBJECT_ID(N'[dbo].[시퀀스10]', 'SO') IS NOT NULL DROP SEQUENCE 시퀀스10 

    -- [시퀀스10]을 새롭게 생성 한다 
    CREATE SEQUENCE 시퀀스10  
        AS BIGINT          -- 데이터형   (생략시 BIGINT형)
        START WITH 0       -- 최초시작값 (생략시 데이터형의 최소값)
        INCREMENT BY 1     -- 다음증가값 (생략시 1)
        MINVALUE 0         -- 최소값     (생략시 데이터형의 최소값)
        MAXVALUE 5         -- 최대값     (생략시 데이터형의 최대값)
        CYCLE              -- 최대값 도달시 다시 사작 (생략시 NO CYCLE)
        NO CACHE;          -- 캐시 사용여부 (생략시 CACHE 사용)
                           --(캐시 사용시 오류 문제로 순번이 손실될 수 있음) 

    -- 시퀀스 번호를 10개 화면에 표시 한다 (칼럼이름을 [순번]으로 지정)
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 

    -- 현재 캐시값과 현재(최근) 시퀀스값 조회 
    SELECT *   
      FROM SYS.SEQUENCES  
     WHERE NAME = '시퀀스10' 

     -- 기존에 시퀀스 값을 무시하고 다시 시작번호를 설정한다 
    ALTER SEQUENCE 시퀀스10 RESTART WITH 2;   

    -- 현재 캐시값과 현재(최근) 시퀀스값 조회 
    SELECT *   
      FROM SYS.SEQUENCES  
     WHERE NAME = '시퀀스10' 

    -- 시퀀스 번호를 하나 더 발급하여 화면에 표시 한다 
    SELECT 순번 = NEXT VALUE FOR 시퀀스10 



END   


GO
