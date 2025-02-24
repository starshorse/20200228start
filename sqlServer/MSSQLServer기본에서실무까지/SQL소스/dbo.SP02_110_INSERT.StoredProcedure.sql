USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_110_INSERT]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*-------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: INSERT 테스트 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_110_INSERT]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_110_INSERT]
AS
BEGIN

    -- T매출 테이블 생성 스크립트
    -- DEFAULT 명령은 기본값을 설정시 사용된다  
    -- 테이블은 임시테이블을 활용 합니다. 
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

    -- 전체칼럼 명시 (권장 형식)
    INSERT INTO #T매출 (일자, 제품, 수량, 단가, 금액)
                VALUES ('20200101', 'A3', 10, 100, 1000)

    -- 일부칼럼만 명시 (기본값 있을 경우 기본값 설정됨) 
    INSERT INTO #T매출 (일자, 제품, 수량)
                VALUES ('20200101', 'A4', 20)

    -- SELECT 결과를 일괄 INSERT (많이 활용되는 형식)
    INSERT INTO #T매출 (일자, 제품, 수량, 단가, 금액)
         SELECT '20200101', 'A5', 30, 100, 3000
          UNION ALL 
         SELECT '20200101', 'A6', 40, 100, 4000

    -- 일부칼럼만 명시 
    INSERT INTO #T매출 (일자, 제품)
                VALUES ('20200101', 'A1')
    
    -- 일부칼럼만 명시 
    INSERT INTO #T매출 (일자)
                VALUES ('20200101')

    -- 모든 자료 조회 
    SELECT A.*
      FROM #T매출 A 
    
END   


GO
