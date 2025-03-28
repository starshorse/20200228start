USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP02_140_MERGE]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------------------------
  작 성 일: 2019년 12월 28일 
  작 성 자: 김정현
  기    능: MERGE 테스트 예제 
----------------------------------------------------------------------------------------------------
  수정일    수정자    요청자    내용
----------------------------------------------------------------------------------------------------
EXEC [dbo].[SP02_140_MERGE]

 
----------------------------------------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP02_140_MERGE]
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


    -- MERGE문으로 기존에 자료가 없으면 INSERT 수행 / 자료가 있으면 UPDATE 수행 
    MERGE #T매출 T
    USING (SELECT 일자 = '20200101'
                 ,제품 = 'A1'
                 ,수량 = 0
                 ,단가 = 300) S ON T.일자 = S.일자 AND T.제품 = S.제품 
     WHEN MATCHED AND S.수량 <> 0 THEN            -- S와 T에 모두 자료가 존재하고 수량이 0이 아닌 있는 경우 
           UPDATE SET 
                  T.수량 = S.수량 
                 ,T.단가 = S.단가
                 ,T.금액 = S.수량 * S.단가 
     WHEN MATCHED AND S.수량 = 0 THEN             -- S와 T에 모두 자료가 존재하고 수량이 0인 경우  
           DELETE 
     WHEN NOT MATCHED BY TARGET THEN              -- T에 대상 자료가 없는 경우              
  	      INSERT (일자, 제품, 수량, 단가, 금액) 
	      VALUES (S.일자, S.제품, S.수량, S.단가, S.수량 * S.단가);   -- 반드시 ; 로 종료해야 한다
      

    -- 모든 자료 조회 
    SELECT A.*
      FROM #T매출 A 
    
END   


GO
