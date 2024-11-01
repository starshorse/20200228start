USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_151_칼럼정보및주석처리]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 칼럼 단위로 주석 처리 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_151_칼럼정보및주석처리]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_151_칼럼정보및주석처리]  
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
    DECLARE @주석제목  NVARCHAR(100) 
           ,@주석내용  NVARCHAR(100) 
           ,@테이블명  NVARCHAR(100) 
           ,@칼럼명    NVARCHAR(100) 
    
    SET @주석제목  = '칼럼주석' 
    SET @주석내용  = '두자리코드,한글불가' 
    SET @테이블명  = '주석테스트' 
    SET @칼럼명    = '제품코드' 

    -- 기존에 주석 항목이 이미 입력되어 있는 경우에는 관련 자료를 제거 
    IF EXISTS (SELECT * 
                 FROM FN_LISTEXTENDEDPROPERTY (NULL, 'SCHEMA', 'DBO' , 'TABLE', @테이블명, 'COLUMN', DEFAULT) 
                WHERE NAME = @주석제목 
                  AND OBJNAME = @칼럼명
                  AND NAME    = @주석제목) BEGIN 
        -- 주석 제거 
        EXEC SP_DROPEXTENDEDPROPERTY @NAME       = @주석제목, @LEVEL0TYPE = 'SCHEMA',  @LEVEL0NAME = 'DBO', @LEVEL1TYPE = 'TABLE',   
                                     @LEVEL1NAME = @테이블명, @LEVEL2TYPE = N'COLUMN', @LEVEL2NAME = @칼럼명
    END 
    
    -------------------------------------------------------------------------------------------------
    -- 칼럼 단위 주석을 입력 한다 
    -------------------------------------------------------------------------------------------------
    EXEC SYS.SP_ADDEXTENDEDPROPERTY @NAME       = @주석제목, @VALUE     =  @주석내용, @LEVEL0TYPE = 'SCHEMA', @LEVEL0NAME = 'DBO', 
                                    @LEVEL1TYPE = 'TABLE',   @LEVEL1NAME = @테이블명, @LEVEL2TYPE = 'COLUMN', @LEVEL2NAME = @칼럼명


    -------------------------------------------------------------------------------------------------
    -- 칼럼단위 정보 및 기본정보(주석포함) 목록정보 조회 
    -------------------------------------------------------------------------------------------------
    SELECT 테이블명   = B.TABLENAME
          ,칼럼명     = A.COLUMN_NAME
          ,칼럼주석   = ISNULL(B.COLUMNDESCRIPTION,'')
          ,[NULL]     = IIF(A.IS_NULLABLE = 'YES', 'Y', 'N')
          ,PK         = IIF(B.IDXTYPE     = 1,     'Y', '') 
          ,FK         = IIF(B.FKEY IS NOT NULL,    'Y', '')
          ,자료형식   = A.DATA_TYPE
          ,자료길이   = IIF(A.CHARACTER_MAXIMUM_LENGTH IS NULL, ISNULL(A.NUMERIC_PRECISION, ''), A.CHARACTER_MAXIMUM_LENGTH)
          ,소수점     = A.NUMERIC_SCALE
          ,기본값     = ISNULL(A.COLUMN_DEFAULT, '')
          ,참조테이블 = IIF(B.REFID    IS NOT NULL, OBJECT_NAME(B.REFID), '') 
          ,참조칼럼   = IIF(B.REFCOLID IS NOT NULL, COL_NAME(B.REFID, B.REFCOLID), '')
          ,순서       = A.ORDINAL_POSITION
      FROM INFORMATION_SCHEMA.COLUMNS A (NOLOCK)
     INNER JOIN (SELECT TABLENAME         = A.NAME  
                       ,COLUMNNAME        = B.NAME  
                       ,COLUMNDESCRIPTION = C.VALUE 
                       ,FKEY              = MAX(D.FKEY)
                       ,REFID             = MAX(D.REFID) 
                       ,REFCOLID          = MAX(D.REFCOLID)
                       ,IDXTYPE           = MAX(E.IDXTYPE)
                  FROM SYS.TABLES                   A (NOLOCK)
                 INNER JOIN SYS.COLUMNS             B (NOLOCK) ON A.OBJECT_ID = B.OBJECT_ID
                  LEFT JOIN SYS.EXTENDED_PROPERTIES C (NOLOCK) ON A.OBJECT_ID = C.MAJOR_ID   AND B.COLUMN_ID = C.MINOR_ID
                  LEFT JOIN (SELECT FKEY     = F.NAME 
                                   ,REFID    = FC.REFERENCED_OBJECT_ID 
                                   ,REFCOLID = FC.REFERENCED_COLUMN_ID 
                                   ,F.PARENT_OBJECT_ID, FC.PARENT_COLUMN_ID
                              FROM SYS.FOREIGN_KEYS F
                             INNER JOIN SYS.FOREIGN_KEY_COLUMNS FC ON F.OBJECT_ID = FC.CONSTRAINT_OBJECT_ID
                            ) D ON A.OBJECT_ID = D.PARENT_OBJECT_ID AND B.COLUMN_ID = D.PARENT_COLUMN_ID
                  LEFT JOIN (SELECT IDXTYPE = I.TYPE 
                                   ,I.OBJECT_ID, C.COLUMN_ID
                               FROM SYS.INDEXES I 
                              INNER JOIN SYS.INDEX_COLUMNS C ON I.INDEX_ID = C.INDEX_ID AND C.OBJECT_ID = I.OBJECT_ID 
                              WHERE I.TYPE = 1
                              GROUP BY I.TYPE, I.OBJECT_ID, C.COLUMN_ID
                            ) E ON A.OBJECT_ID = E.OBJECT_ID AND B.COLUMN_ID = E.COLUMN_ID
                 GROUP BY A.NAME, B.NAME, C.VALUE 
                 ) B ON A.TABLE_NAME = B.TABLENAME AND A.COLUMN_NAME = B.COLUMNNAME
     WHERE B.TABLENAME = '주석테스트'    -- 테이블명 입력 
     ORDER BY 테이블명, 순서


END 
GO
