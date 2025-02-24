USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP05_190_TRY_CATCH]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*-------------------------------------------------------------------
  작 성 일: 2020년 1월 16일 
  작 성 자: 김정현
  기    능: TRY CACHE 적용 예제 
---------------------------------------------------------------------
  수정일    수정자    요청자    내용
---------------------------------------------------------------------
EXEC [dbo].[SP05_190_TRY_CATCH]
 
---------------------------------------------------------------------*/
CREATE PROCEDURE [dbo].[SP05_190_TRY_CATCH]
AS
BEGIN

    -------------------------------------------------------------
    -- 테스트용 #임시1 테이블 생성 
    -------------------------------------------------------------
    CREATE TABLE #임시1 (
        코드     NVARCHAR(10)
       ,수량     NUMERIC(18,0)
    )

    BEGIN TRY 
         -- 의도적으로 INSERT시 오류 발생 (수량에 문자 입력)
        INSERT INTO #임시1 (코드, 수량) 
                   VALUES ('A', '30A')

        SELECT 결과 = '성공처리' 
    END TRY  
    BEGIN CATCH 
        -- 오류가 발생되면 처리 되는 문장임 
        SELECT 결과         = '오류발생' 
              ,오류번호     = @@ERROR 
              ,오류오브젝트 = ERROR_PROCEDURE()
              ,오류행번호   = ERROR_LINE()
              ,오류메시지   = ERROR_MESSAGE()
              ,오류상태코드 = ERROR_STATE()
              ,오류심각도   = ERROR_SEVERITY()
    END CATCH

END   


GO
