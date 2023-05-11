--  Variables

-- Declaring a variable

DECLARE @model_year SMALLINT;
GO
DECLARE @model_year AS SMALLINT;
GO
DECLARE @model_year SMALLINT, 
        @product_name VARCHAR(MAX);

-- Assigning a value to a variable
SET @model_year = 2018;

-- Using variables in a query
SELECT
    product_name,
    model_year,
    list_price 
FROM 
    "production.products"
WHERE 
    model_year = @model_year
ORDER BY
    product_name;
GO
DECLARE @model_year SMALLINT;

SET @model_year = 2018;

SELECT
    product_name,
    model_year,
    list_price 
FROM 
    "production.products"
WHERE 
    model_year = @model_year
ORDER BY
    product_name;

-- Storing query result in a variable
-- To hide the number of rows affected messages, you use the following statement:
SET NOCOUNT ON;    
DECLARE @product_count INT;
SET @product_count = (
    SELECT 
        COUNT(*) 
    FROM 
        "production.products" 
);
SELECT @product_count;
PRINT @product_count;
PRINT 'The number of products is ' + CAST(@product_count AS VARCHAR(MAX));

-- Selecting a record into variables
DECLARE 
    @product_name VARCHAR(MAX),
    @list_price DECIMAL(10,2);
SELECT 
    @product_name = product_name,
    @list_price = list_price
FROM
    "production.products"
WHERE
    product_id = 100;
SELECT 
    @product_name AS product_name, 
    @list_price AS list_price;

-- Accumulating values into a variable
GO
ALTER  PROC uspGetProductList(
    @model_year SMALLINT
) AS 
BEGIN
    DECLARE @product_list VARCHAR(MAX);

    SET @product_list = '';

    SELECT
        @product_list = @product_list + product_name 
                        + CHAR(10)
    FROM 
        "production.products"
    WHERE
        model_year = @model_year
    ORDER BY 
        product_name;

    PRINT @product_list;
END;

EXEC uspGetProductList 2018











