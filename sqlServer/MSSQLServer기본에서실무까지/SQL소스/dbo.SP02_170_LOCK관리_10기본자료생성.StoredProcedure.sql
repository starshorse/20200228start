USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_170_LOCK관리_10기본자료생성]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: LOCK 관리 테스트 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_170_LOCK관리_10기본자료생성]

----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_170_LOCK관리_10기본자료생성]
AS
BEGIN

    -- T매출 테이블이 이미 존재하면 기존테이블을 제거함 
    IF OBJECT_ID(N'[dbo].[T매출]', 'U') IS NOT NULL
        DROP TABLE T매출    

    -- T매출 테이블 생성 스크립트
    CREATE TABLE T매출 (
        일자    NVARCHAR(08)
       ,제품    NVARCHAR(30)
       ,수량    NUMERIC(18,0) DEFAULT 0  NULL -- 기본값0설정
       ,PRIMARY KEY (일자, 제품)
    )

    -- 기본 자료 등록 
    INSERT INTO T매출 (일자, 제품, 수량) 
        VALUES ('20200101', 'A1', 10)
             , ('20200102', 'A2', 20)
     
END   


GO
