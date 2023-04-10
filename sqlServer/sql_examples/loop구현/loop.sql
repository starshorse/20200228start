-- SQL WHILE loop with simple examples

DECLARE @Counter INT 
SET @Counter=1
WHILE ( @Counter <= 10)
BEGIN
    PRINT 'The counter value is = ' + CONVERT(VARCHAR,@Counter)
    SET @Counter  = @Counter  + 1
END
-- CONTINUE statement.
GO
DECLARE @Counter INT 
SET @Counter=1
WHILE ( @Counter <= 20)
BEGIN
 
  IF @Counter % 2 =1
  BEGIN
  SET @Counter  = @Counter  + 1
  CONTINUE
  END
    PRINT 'The counter value is = ' + CONVERT(VARCHAR,@Counter)
    SET @Counter  = @Counter  + 1
END
GO
-- Reading table records through the WHILE loop
DROP TABLE IF EXISTS #SampleTable
CREATE TABLE #SampleTable
(Id INT, CountryName NVARCHAR(100), ReadStatus TINYINT)
GO
INSERT INTO #SampleTable ( Id, CountryName, ReadStatus)
Values (1, 'Germany', 0),
        (2, 'France', 0),
        (3, 'Italy', 0),
    (4, 'Netherlands', 0) ,
       (5, 'Poland', 0)
 
SELECT * FROM #SampleTable
GO
DECLARE @Counter INT , @MaxId INT, 
        @CountryName NVARCHAR(100)
SELECT @Counter = min(Id) , @MaxId = max(Id) 
FROM #SampleTable
 
WHILE(@Counter IS NOT NULL
      AND @Counter <= @MaxId)
BEGIN
   SELECT @CountryName = CountryName
   FROM #SampleTable WHERE Id = @Counter
    
   PRINT CONVERT(VARCHAR,@Counter) + '. country name is ' + @CountryName  
   SET @Counter  = @Counter  + 1        
END

