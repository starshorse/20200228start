-- SQL Server Temporary Tables

-- Creating temporary tables
-- Create temporary tables using SELECT INTO statement

SELECT
    product_name,
    list_price
INTO #trek_products --- temporary table
FROM
    "production.products"
WHERE
    brand_id = 9;
GO
-- Create temporary tables using CREATE TABLE statement

CREATE TABLE #haro_products (
    product_name VARCHAR(MAX),
    list_price DEC(10,2)
);
GO

INSERT INTO #haro_products
SELECT
    product_name,
    list_price
FROM 
    "production.products"
WHERE
    brand_id = 2;

GO
SELECT
    *
FROM
    #haro_products;
GO
-- Global temporary tables
CREATE TABLE ##heller_products (
    product_name VARCHAR(MAX),
    list_price DEC(10,2)
);

INSERT INTO ##heller_products
SELECT
    product_name,
    list_price
FROM 
    "production.products"
WHERE
    brand_id = 3;
GO
-- Dropping temporary tables
-- Manual Deletion

DROP TABLE ##table_name;









