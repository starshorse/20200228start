USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_150_테이블정보및주석처리]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 테이블 단위로 주석 처리 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_150_테이블정보및주석처리]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_150_테이블정보및주석처리]  
AS
BEGIN

    SET NOCOUNT ON

    IF OBJECT_ID(N'주석테스트', 'U') IS NOT NULL DROP TABLE 주석테스트 

    CREATE TABLE 주석테스트 (
        제품코드   NVARCHAR(30) NOT NULL
       ,제품명     NVARCHAR(100)
       ,단가       NUMERIC(18,3) DEFAULT 0 
       ,PRIMARY KEY (제품코드) 
    )
    INSERT INTO 주석테스트 (제품코드, 제품명) 
               VALUES ('A1', '사과'), ('A2','당근')
 
    -- 입력할 테이블명, 주석제목, 내용 변수 선언 및 값을 입력  
    DECLARE @테이블명  NVARCHAR(100) = '주석테스트' 
           ,@주석제목  NVARCHAR(100) = '주석' 
           ,@주석내용  NVARCHAR(100) = '테이블주석을 입력한 테이블' 

    -- 기존에 주석 항목이 이미 입력되어 있는 경우에는 관련 자료를 제거  
    IF EXISTS (SELECT * 
                 FROM FN_LISTEXTENDEDPROPERTY(NULL, 'SCHEMA', 'DBO'  , 'TABLE', DEFAULT, DEFAULT, DEFAULT)
                WHERE OBJNAME = @테이블명 
                  AND NAME    = @주석제목) BEGIN 
        -- 주석 제거 
        EXEC SYS.SP_DROPEXTENDEDPROPERTY @NAME       = @주석제목, @LEVEL0TYPE = 'SCHEMA',
                                         @LEVEL0NAME = 'DBO',     @LEVEL1TYPE = 'TABLE', @LEVEL1NAME= @테이블명   
    END 

    -------------------------------------------------------------------------------------------------
    -- 테이블 단위 주석을 입력 한다 
    -------------------------------------------------------------------------------------------------
    EXEC SYS.SP_ADDEXTENDEDPROPERTY @NAME       = @주석제목, @VALUE  = @주석내용, @LEVEL0TYPE = 'SCHEMA',
                                    @LEVEL0NAME = 'DBO', @LEVEL1TYPE = 'TABLE',   @LEVEL1NAME = @테이블명   

    -------------------------------------------------------------------------------------------------
    -- 테이블단위 정보 및 기본정보(주석포함) 목록정보 조회 
    -------------------------------------------------------------------------------------------------
    SELECT 오너명     = A.TABLE_CATALOG
          ,DB명       = DB_NAME() 
          ,테이블명   = A.TABLE_NAME
          ,테이블주석 = ISNULL(E.VALUE, '')
          ,테이블건수 = C.ROWS
          ,[테이블크기(MB)] =CONVERT(NUMERIC(18,1), C.RESERVED * 8.192 / 1024.)
          ,생성일시   = D.CREATE_DATE
          ,변경일시   = D.MODIFY_DATE
     FROM INFORMATION_SCHEMA.TABLES A 
    INNER JOIN SYSOBJECTS           B ON B.NAME = A.TABLE_NAME
    INNER JOIN SYSINDEXES           C ON B.ID   = C.ID
    INNER JOIN SYS.OBJECTS          D ON D.NAME = A.TABLE_NAME
     LEFT JOIN (SELECT TABLE_ID = OBJECT_ID(OBJNAME), 
                       VALUE
                  FROM FN_LISTEXTENDEDPROPERTY (NULL, 'SCHEMA', 'DBO', 'TABLE', DEFAULT, DEFAULT, DEFAULT)
               ) E ON OBJECT_ID(A.TABLE_NAME) = E.TABLE_ID
    ORDER BY A.TABLE_CATALOG, DB_NAME(), A.TABLE_NAME

END 
GO
