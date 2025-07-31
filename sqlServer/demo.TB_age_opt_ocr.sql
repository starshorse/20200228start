/****** SSMS의 SelectTopNRows 명령 스크립트 ******/
SELECT TOP (1000) [seq]
      ,[RegDate]
      ,[UpdateDate]
      ,[Material (Customer)]
	  ,REPLACE([Start date of movement], '/', '-') AS [Start date of movement]
      ,[Material status]
      ,[Quantity]
      ,[Unrestricted-use stock]
      ,[source_file]
  FROM [demo].[dbo].[TB_age_opt_ocr]
  for json path
