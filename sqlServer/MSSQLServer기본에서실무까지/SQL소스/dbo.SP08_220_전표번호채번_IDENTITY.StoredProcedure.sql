USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP08_220_전표번호채번_IDENTITY]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*------------------------------------------------------
  작 성 일: 2020년 02월 01일 
  작 성 자: 김정현
  기    능: 테이블의 IDENTITY를 활용한 전표번호 채번 
            매출일자에 [0] 을 입력하면 관련 테이블 초기화됨 
--------------------------------------------------------
  수정일    수정자    요청자    내용

--------------------------------------------------------
DECLARE @전표번호 NVARCHAR(30)

EXEC [dbo].[SP08_220_전표번호채번_IDENTITY] 
            @IN_매출일자 = '20210101',
            @OUT_전표번호 = @전표번호 OUTPUT

SELECT 전표번호 = @전표번호
 
--------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP08_220_전표번호채번_IDENTITY]  
      @IN_매출일자    NVARCHAR(08),
      @OUT_전표번호   NVARCHAR(30) OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;   

    SET @OUT_전표번호 = ''

    -- 순번테이블을 초기화 및 재생성 하려면 매출일자에 [0] 입력
    IF @IN_매출일자 = '0'  BEGIN 
        IF OBJECT_ID('순번매출2019', 'U') IS NOT NULL  DROP TABLE 순번매출2019
        IF OBJECT_ID('순번매출2020', 'U') IS NOT NULL  DROP TABLE 순번매출2020
        IF OBJECT_ID('순번매출2021', 'U') IS NOT NULL  DROP TABLE 순번매출2021
        
        CREATE TABLE 순번매출2020 (
            전표번호   INT IDENTITY(3, 1),
            체크       INT
        )

        SET @OUT_전표번호 = '초기화:순번테이블 재생성완료'
        RETURN(20)
    END 

    -- 2019~2021까지의 년도만 입력 가능 제약 
    IF NOT LEFT(@IN_매출일자, 4) BETWEEN '2019' AND '2021'   BEGIN 
        SET @OUT_전표번호 = '오류10:매출일자범위초과'
        RETURN(10)
    END 

    ----------------------------------------------------------------------
    -- 실습을 위한 테이블 생성 및 기초자료, 관련변수 정의 
    ----------------------------------------------------------------------
    CREATE TABLE #매출 (
        전표번호        NVARCHAR(20),
        매출일자        NVARCHAR(20),
        매출수량        NUMERIC(18, 0)
    )

    INSERT INTO #매출 (전표번호, 매출일자, 매출수량) 
         VALUES ('매출2019-0001', '20191202', 100),
                ('매출2019-0002', '20191203', 70),  
                ('매출2019-0003', '20191204', 50),  
                ('매출2020-0001', '20200103', 70),  
                ('매출2020-0002', '20200105', 85)

    DECLARE @TXT_쿼리문장       NVARCHAR(1000),
            @NUM_최대값         INT,
            @NUM_신규채번       INT,
            @TXT_순번테이블명   NVARCHAR(50) = CONCAT('순번매출',LEFT(@IN_매출일자, 4))

    ----------------------------------------------------------------------
    -- 년도별 순번테이블 존재 확인 및 생성(년도별 순번테이블 이름 달라 동적SQL 처리)
    ----------------------------------------------------------------------
    IF OBJECT_ID(@TXT_순번테이블명, 'U') IS NULL  BEGIN 
		SELECT @NUM_최대값 = ISNULL(MAX(RIGHT(A.전표번호,4)) + 1, 1) 
			FROM #매출 A 
			WHERE 1 = 1 
			AND A.전표번호 LIKE CONCAT('매출',LEFT(@IN_매출일자, 4),'%')
     
		SET @TXT_쿼리문장 = N'CREATE TABLE ' + @TXT_순번테이블명 + ' (   
							  	    전표번호   INT IDENTITY(' + CONVERT(NVARCHAR, @NUM_최대값) + ', 1), 
								    체크       INT)  '

		EXEC (@TXT_쿼리문장)

    END 

   ----------------------------------------------------------------------
    -- 해당 년도의 순번테이블에서 신규채번(년도별 순번테이블 이름 달라 동적SQL 처리)
    ----------------------------------------------------------------------
 	SET @TXT_쿼리문장 = N'INSERT INTO ' + @TXT_순번테이블명 + ' (체크) VALUES (0);   
                          SELECT @NUM_신규채번 = SCOPE_IDENTITY()  '

    EXEC SP_EXECUTESQL @TXT_쿼리문장, N'@NUM_신규채번 INT OUTPUT', @NUM_신규채번 = @NUM_신규채번 OUTPUT

    -- 채번된 번호가 9999를 초과하면 오류 발생
    IF @NUM_신규채번 >= 9999 BEGIN 
        SET @OUT_전표번호 = '오류90:신규채번9999초과'
        RETURN(90)
    END 

    -- 정상적인 전표번호 반환  
   	SET @OUT_전표번호 = CONCAT('매출', LEFT(@IN_매출일자, 4),'-', FORMAT(@NUM_신규채번, '0000'))
    RETURN(1)

END
GO
