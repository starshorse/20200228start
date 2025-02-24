USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_210_페이지별조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 페이지별 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [dbo].[SP08_210_페이지별조회] @IN_조회페이지 = 3
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_210_페이지별조회]   @IN_조회페이지   INT 
AS
BEGIN
    SET NOCOUNT ON;   
    ----------------------------------------------------------------------
    -- 실습을 위한 테이블 생성 및 자료 입력 
    ----------------------------------------------------------------------
    CREATE TABLE #문서 (
        문서번호        INT,
        문서제목        NVARCHAR(30)
    )
    INSERT INTO #문서 (문서번호 , 문서제목) 
         VALUES (01, '문서01'),(02, '문서02'),(03, '문서03'),(04, '문서04'),
                (05, '문서05'),(06, '문서06'),(07, '문서07'),(08, '문서08'),
                (09, '문서09'),(10, '문서10'),(11, '문서11'),(12, '문서12'),
                (13, '문서13'),(14, '문서14'),(15, '문서15'),(16, '문서16'),
                (17, '문서17'),(18, '문서18'),(19, '문서19'),(20, '문서20')                 
    ----------------------------------------------------------------------
    -- 게시판 관련 기준 설정 및 조회 데이터 생성 
    ----------------------------------------------------------------------
    DECLARE @페이지당조회건수   INT = 7,   -- 한페이지당 7개 조회 
            @총페이지수         INT, 
            @시작문서번호       INT 

    SELECT @총페이지수 = CEILING(COUNT(*) / (@페이지당조회건수 * 1.0))
      FROM #문서 A 
    ----------------------------------------------------------------------
    -- 결과 출력 
    ----------------------------------------------------------------------
    SET @시작문서번호 = @IN_조회페이지 * @페이지당조회건수 - @페이지당조회건수 

    SELECT A.문서번호, A.문서제목 ,
           현재페이지 = @IN_조회페이지,
           총페이지수 = @총페이지수
      FROM #문서 A 
     ORDER BY A.문서번호 
     OFFSET @시작문서번호 ROWS 
     FETCH NEXT @페이지당조회건수 ROWS ONLY
END
GO
