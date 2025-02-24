USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_180_외부키]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: 외부키 실습 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_180_외부키]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_180_외부키]
AS
BEGIN
    
    -- 외부키(FK)는 임시테이블에는 적용되지 않습니다
    -- T매출 테이블 생성 스크립트
    IF OBJECT_ID(N'[dbo].[T매출]', 'U') IS NOT NULL DROP TABLE T매출 

    CREATE TABLE T매출 (
        일자    NVARCHAR(08)
       ,제품    NVARCHAR(30)
       ,수량    NUMERIC(18,0) DEFAULT 0  NULL -- 기본값0설정
       ,PRIMARY KEY (일자, 제품)
    )

    -- T매출 자료 등록 
    INSERT INTO T매출 (일자, 제품, 수량) 
        VALUES ('20200101', 'A1', 10)
             , ('20200102', 'A2', 20)

    -- T제품 테이블 생성 스크립트
    IF OBJECT_ID(N'[dbo].[T제품]', 'U') IS NOT NULL DROP TABLE T제품 

    CREATE TABLE T제품 (
        제품    NVARCHAR(30)
       ,제품명  NVARCHAR(100)
       ,PRIMARY KEY (제품)
    )

    -- 기본 자료 등록 
    INSERT INTO T제품 (제품, 제품명) 
        VALUES ('A1', '사과'), ('A2', '당근')


    ALTER TABLE [T매출] ADD CONSTRAINT [T매출_FK1] FOREIGN KEY ([제품]) 
                            REFERENCES [T제품] ([제품])
    
    INSERT INTO T매출 (일자, 제품, 수량) 
        VALUES ('20200103', 'A3', 30)
    
    DELETE A 
      FROM T제품 A 
     WHERE A.제품 = 'A1' 
    
    DROP TABLE T제품 
END   


GO
