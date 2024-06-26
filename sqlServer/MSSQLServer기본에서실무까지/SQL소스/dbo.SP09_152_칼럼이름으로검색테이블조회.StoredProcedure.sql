USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_152_칼럼이름으로검색테이블조회]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 04일 
  작 성 자: 김정현
  기    능: 특정 칼럼이름이 포함된 테이블 내역 조회 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_152_칼럼이름으로검색테이블조회]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_152_칼럼이름으로검색테이블조회]  
AS
BEGIN

    SET NOCOUNT ON

    -- 특정칼럼명이 사용된 테이블 목록 조회 
    SELECT T.NAME AS TABLE_NAME, C.NAME AS COLUMN_NAME
      FROM SYS.TABLES T
     INNER JOIN  SYS.COLUMNS C ON  T.OBJECT_ID = C.OBJECT_ID
     WHERE C.NAME LIKE '%제품%'


END 
GO
