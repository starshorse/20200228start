-- SQL Server DELETE

-- SQL Server DELETE statement examples
/*
Let¡¯s create a new table for the demonstration.

The following statement creates a table named production.product_history with the data copied from the production.products table:
*/
SELECT * 
INTO production.product_history
FROM
    "production.products";
GO
SELECT * FROM production.product_history;
GO

-- 1) Delete the number of random rows example
DELETE TOP (21)
FROM production.product_history;
GO

-- 2) Delete the percent of random rows example
DELETE TOP (5) PERCENT
FROM production.product_history;
GO
-- 3) Delete some rows with a condition example
DELETE
FROM
    production.product_history
WHERE
    model_year = 2017;
GO
-- 4) Delete all rows from a table example
DELETE FROM  production.product_history;










