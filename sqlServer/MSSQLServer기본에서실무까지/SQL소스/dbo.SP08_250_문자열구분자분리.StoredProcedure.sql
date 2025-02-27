USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_250_문자열구분자분리]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 문자열구분자분리 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
EXEC [SP08_250_문자열구분자분리]

--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_250_문자열구분자분리]  
AS
BEGIN
    SET NOCOUNT ON;   

    ---------------------------------------------------------------
    -- FUNCTION으로 개발 하고 실습을 위해 호출 및 출력 
    -- 상세한 소스코드는 FUNCTION 을 확인 요망 
    SELECT A.* 
      FROM [UFT08_250_문자열구분자분리]('A,B,C,D', ',') A

    ---------------------------------------------------------------
    -- SQL Server 2016 부터 STRING_SPLIT() 함수 지원 
    SELECT VALUE FROM STRING_SPLIT('A,B,C,D', ',')
    
    ---------------------------------------------------------------
    -- SQL Server 2017 부터 STRING_AGG() 함수 지원 
    SELECT 결과 = STRING_AGG (A.항목, ',') 
      FROM (SELECT 항목 = 'A'  UNION ALL 
            SELECT 항목 = 'B'  UNION ALL 
            SELECT 항목 = 'C'  UNION ALL 
            SELECT 항목 = 'D' ) A

    ---------------------------------------------------------------
    -- 재귀호출 방식으로도 문자열을 구분자로 분리 할 수 있다 
    -- 재귀호출은 Function 에서 쓸수 없다. (WITH문 오류발생) 
   DECLARE @원문자열  NVARCHAR(1000) = 'A,B,C,D'
          ,@구분자    NVARCHAR(20)   = N',';

    WITH Q AS
    (
        SELECT 분리문자 = CONVERT(NVARCHAR, SUBSTRING(@원문자열, 0, CHARINDEX(@구분자, @원문자열)))
              ,잔여문자 = CONVERT(NVARCHAR, STUFF(@원문자열 + @구분자, 1 , CHARINDEX(@구분자, @원문자열), ''))
         UNION ALL
        SELECT 분리문자 = CONVERT(NVARCHAR, SUBSTRING(잔여문자, 0, CHARINDEX(@구분자, 잔여문자)))
              ,잔여문자 = CONVERT(NVARCHAR, STUFF(잔여문자, 1, CHARINDEX(@구분자, 잔여문자), ''))
          FROM  Q
         WHERE 잔여문자 <> ''
    )
    SELECT *
      FROM Q option (maxrecursion 500);

END
GO
