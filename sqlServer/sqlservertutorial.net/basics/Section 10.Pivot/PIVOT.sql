-- SQL Server PIVOT
-- Setting up the goals

SELECT 
    category_name, 
    COUNT(product_id) product_count
FROM 
    "production.products" p
    INNER JOIN "production.categories" c 
        ON c.category_id = p.category_id
GROUP BY 
    category_name;
GO
/*
You follow these steps to make a query a pivot table:

First, select a base dataset for pivoting.
Second, create a temporary result by using a derived table or common table expression (CTE)
Third, apply the PIVOT operator.
*/
SELECT 
    category_name, 
    product_id
FROM 
    "production.products" p
    INNER JOIN "production.categories" c 
        ON c.category_id = p.category_id
GO
SELECT * FROM (
    SELECT 
        category_name, 
        product_id
    FROM 
        "production.products" p
        INNER JOIN "production.categories" c 
            ON c.category_id = p.category_id
) t
GO
SELECT * FROM   
(
    SELECT 
        category_name, 
        product_id
    FROM 
        "production.products" p
        INNER JOIN "production.categories" c 
            ON c.category_id = p.category_id
) t 
PIVOT(
    COUNT(product_id) 
    FOR category_name IN (
        [Children Bicycles], 
        [Comfort Bicycles], 
        [Cruisers Bicycles], 
        [Cyclocross Bicycles], 
        [Electric Bikes], 
        [Mountain Bikes], 
        [Road Bikes])
) AS pivot_table;
GO
SELECT * FROM   
(
    SELECT 
        category_name, 
        product_id,
        model_year
    FROM 
        "production.products" p
        INNER JOIN "production.categories" c 
            ON c.category_id = p.category_id
) t 
PIVOT(
    COUNT(product_id) 
    FOR category_name IN (
        [Children Bicycles], 
        [Comfort Bicycles], 
        [Cruisers Bicycles], 
        [Cyclocross Bicycles], 
        [Electric Bikes], 
        [Mountain Bikes], 
        [Road Bikes])
) AS pivot_table;
GO
-- Generating column values
DECLARE 
    @columns NVARCHAR(MAX) = '';
SELECT 
    @columns += QUOTENAME(category_name) + ','
FROM 
    "production.categories"
ORDER BY 
    category_name;
SET @columns = LEFT(@columns, LEN(@columns) - 1);
PRINT @columns;
GO
-- Dynamic pivot tables 
DECLARE 
    @columns NVARCHAR(MAX) = '', 
    @sql     NVARCHAR(MAX) = '';

-- select the category names
SELECT 
    @columns+=QUOTENAME(category_name) + ','
FROM 
    "production.categories"
ORDER BY 
    category_name;

-- remove the last comma
SET @columns = LEFT(@columns, LEN(@columns) - 1);

-- construct dynamic SQL
SET @sql ='
SELECT * FROM   
(
    SELECT 
        category_name, 
        model_year,
        product_id 
    FROM 
        production.products p
        INNER JOIN production.categories c 
            ON c.category_id = p.category_id
) t 
PIVOT(
    COUNT(product_id) 
    FOR category_name IN ('+ @columns +')
) AS pivot_table;';

-- execute the dynamic SQL
EXECUTE sp_executesql @sql;















