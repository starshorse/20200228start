USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_130_DELETE]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: DELETE 테스트 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_130_DELETE]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_130_DELETE]
AS
BEGIN

    -- DEFAULT 명령은 기본값을 설정시 사용된다  
    -- 테이블은 임시테이블을 활용 합니다. 
    -- T매출 테이블 생성 스크립트
    CREATE TABLE #T매출 (
        일자    NVARCHAR(08)
       ,제품    NVARCHAR(30)
       ,수량    NUMERIC(18,0) DEFAULT 0  NULL -- 기본값0설정
       ,단가    NUMERIC(18,0) DEFAULT 0  NULL
       ,금액    NUMERIC(18,0) DEFAULT 0  NULL
       ,PRIMARY KEY (일자, 제품)
    )

    -- 기본 데이터를 추가 함 
    INSERT INTO #T매출 (일자, 제품, 수량, 단가, 금액) VALUES ('20200101', 'A1', 10, 100, 1000), ('20200102', 'A2', 20, 200, 4000)

    CREATE TABLE #T단가 (
        제품    NVARCHAR(30)
       ,단가    NUMERIC(18,0) DEFAULT 0  NULL
       ,사용    NVARCHAR(30)
       ,PRIMARY KEY (제품)
    )

    -- 기본 데이터를 추가 함 
    INSERT INTO #T단가 (제품, 단가, 사용) VALUES ('A1', 150, 'Y'), ('A2', 250, 'N')

    -- 표준유형으로 작성 
    DELETE 
      FROM #T매출 
     WHERE 일자 = '20200101'
       AND 제품 = 'A1'


    -- 확장유형으로 작성 
    DELETE A
      FROM #T매출 A 
     WHERE A.일자 = '20200101'
       AND A.제품 = 'A1'


    -- 단가테이블 사용체크하여 삭제
    DELETE A
      FROM #T매출 A 
     INNER JOIN #T단가 B ON A.제품 = B.제품
     WHERE B.사용 = 'N'

    -- 모든 자료 조회 
    SELECT A.*
      FROM #T매출 A 
    
END   


GO
