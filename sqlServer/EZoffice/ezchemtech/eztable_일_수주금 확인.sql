/****** SSMS의 SelectTopNRows 명령 스크립트 ******/
SELECT TOP (1000) [seq]
      ,[수주확정일]
      ,[발주처]
      ,[담당자]
      ,format([수요자판매가],'###,###,###') as 판매가
 FROM [ezchemtech].[dbo].[TB_eztable] where 수주확정일 = convert( char(10), getdate(), 23 )  order by seq desc


 /****** SSMS의 SelectTopNRows 명령 스크립트 ******/
SELECT  format(sum([수요자판매가]),'###,###,###') as 판매가
 FROM [ezchemtech].[dbo].[TB_eztable] where 수주확정일 = convert( char(10), getdate(), 23 )  


  select  DATEPART( Year, 수주확정일 ) as Year , DATEPART( Month, 수주확정일 ) as Month ,format( sum( 수요자판매가 ), '###,###,###' ) as Total  from [ezchemtech].[dbo].[TB_eztable] where 발주처 = '서브원' and 수주확정일 > '2024-01-01'   
  group by DATEPART( YEAR, 수주확정일 ), DATEPART( Month, 수주확정일  )   order by year, Month      
  
  GO
  
  select  DATEPART( Year, 수주확정일 ) as Year , DATEPART( Month, 수주확정일 ) as Month ,format( sum( 수요자판매가 ), '###,###,###' ) as Total  from [ezchemtech].[dbo].[TB_eztable] where 발주처 = '코리아이플랫폼' and 수주확정일 > '2024-01-01'   
  group by DATEPART( YEAR, 수주확정일 ), DATEPART( Month, 수주확정일  )   order by year, Month   