USE [TEST1]
GO
/****** Object:  StoredProcedure [dbo].[SP06_100_생성테스트]    Script Date: 2020-11-06 오전 9:47:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP06_100_생성테스트]
(
   @IN_제품코드  NVARCHAR(50)
  ,@IN_제품명    NVARCHAR(100)
)
AS 
BEGIN 

    SELECT 제품코드 = @IN_제품코드
          ,제품명   = @IN_제품명 

    RETURN(1) 

END 
GO
