-- SQL Server Stored Procedure Parameters

-- Creating a stored procedure with one parameter

SELECT
    product_name,
    list_price
FROM 
    production.products
ORDER BY
    list_price;
GO
CREATE PROCEDURE uspFindProducts
AS
BEGIN
    SELECT
        product_name,
        list_price
    FROM 
        production.products
    ORDER BY
        list_price;
END;
GO
ALTER PROCEDURE uspFindProducts(@min_list_price AS DECIMAL)
AS
BEGIN
    SELECT
        product_name,
        list_price
    FROM 
        production.products
    WHERE
        list_price >= @min_list_price
    ORDER BY
        list_price;
END;
-- Executing a stored procedure with one parameter

EXEC uspFindProducts 100;

-- Creating a stored procedure with multiple parameters
ALTER PROCEDURE uspFindProducts(
    @min_list_price AS DECIMAL = 0
    ,@max_list_price AS DECIMAL = 999999
    ,@name AS VARCHAR(max)
)
AS
BEGIN
    SELECT
        product_name,
        list_price
    FROM 
        production.products
    WHERE
        list_price >= @min_list_price AND
        list_price <= @max_list_price AND
        product_name LIKE '%' + @name + '%'
    ORDER BY
        list_price;
END;
GO
EXECUTE uspFindProducts 
    @name = 'Trek';
GO
EXECUTE uspFindProducts 
    @min_list_price = 6000,
    @name = 'Trek';

-- Using NULL as the default value
ALTER PROCEDURE uspFindProducts(
    @min_list_price AS DECIMAL = 0
    ,@max_list_price AS DECIMAL = NULL
    ,@name AS VARCHAR(max)
)
AS
BEGIN
    SELECT
        product_name,
        list_price
    FROM 
        production.products
    WHERE
        list_price >= @min_list_price AND
        (@max_list_price IS NULL OR list_price <= @max_list_price) AND
        product_name LIKE '%' + @name + '%'
    ORDER BY
        list_price;
END;
GO
EXECUTE uspFindProducts 
    @min_list_price = 500,
    @name = 'Haro';

























