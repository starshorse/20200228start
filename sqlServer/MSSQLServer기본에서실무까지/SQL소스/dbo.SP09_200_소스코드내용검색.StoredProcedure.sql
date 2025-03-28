USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP09_200_소스코드내용검색]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*------------------------------------------------------
  작 성 일: 2020년 03월 02일 
  작 성 자: 김정현
  기    능: 프로시저, Function 소스코드 내용 검색 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------

EXEC [SP09_200_소스코드내용검색]


--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP09_200_소스코드내용검색]  
AS
BEGIN

    SET NOCOUNT ON

    DECLARE @찾는문자 NVARCHAR(100) = '제품';

    SELECT 이름 = B.NAME
         , 종류 = B.TYPE_DESC
         , 소스코드 = A.DEFINITION 
      FROM SYS.SQL_MODULES A WITH (NOLOCK)
      LEFT JOIN SYS.OBJECTS B WITH (NOLOCK) ON A.OBJECT_ID = B.OBJECT_ID
     WHERE A.DEFINITION LIKE '%' + @찾는문자 + '%'      
     ORDER BY B.TYPE, B.NAME 


END 
GO
