USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_153_인덱스트리거조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 테이블의 인덱스, 트리거 내역 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_153_인덱스트리거조회]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_153_인덱스트리거조회]  
AS
BEGIN

    SET NOCOUNT ON

    IF OBJECT_ID(N'인덱스테스트', 'U') IS NOT NULL DROP TABLE 인덱스테스트
    
    CREATE TABLE 인덱스테스트 (
        제품코드   NVARCHAR(30) NOT NULL
       ,거래처코드 NVARCHAR(30) NOT NULL
       ,수량       NUMERIC(18,0)
       ,PRIMARY KEY (제품코드, 거래처코드) 
    )

    CREATE INDEX 인덱스테스트_IDX1 ON 인덱스테스트 (거래처코드) 

    INSERT INTO 인덱스테스트 (제품코드, 거래처코드, 수량)
                      VALUES ('A', 'A1', 10)
                            ,('A', 'A2', 20)
                            ,('B', 'B1', 10)
                            ,('B', 'B2', 20)


    -- 사용자가 만든 인덱스 내역 조회 
    SELECT 통계수정일자 = STATS_DATE (A.ID, B.INDID) 
          ,테이블명     = A.NAME 
          ,인덱스명     = B.NAME 
      FROM SYSOBJECTS A
     INNER JOIN SYSINDEXES B ON A.ID = B.ID
     WHERE A.TYPE = 'U'
     ORDER BY 테이블명, 인덱스명 

    -- 트리거 목록 조회 
    SELECT 대상테이블 = OBJECT_NAME(PARENT_ID) 
          ,트리거명   = NAME
      FROM SYS.TRIGGERS
    ORDER BY 대상테이블 


    -- 특정 테이블의 인덱스 내역 조회 
    EXEC SP_HELPINDEX  제품_TRG_입력수정삭제  

    -- 테이블의 조각화 수준을 조회 
    DBCC SHOWCONTIG (인덱스테스트)

    -- 인덱스 통계 보기 
    DBCC SHOW_STATISTICS (인덱스테스트, 인덱스테스트_IDX1)

    --인덱스 조각모음. - TABLE 인덱스 다시 잡음
    DBCC DBREINDEX (인덱스테스트)

    --테이블 통계 업데이트
    UPDATE STATISTICS 인덱스테스트 

END 
GO
