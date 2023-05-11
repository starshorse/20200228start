-- A Basic Guide to SQL Server Stored Procedures

-- Creating a simple stored procedure

SELECT 
	product_name, 
	list_price
FROM 
	production.products
ORDER BY 
	product_name;
GO
CREATE PROCEDURE uspProductList
AS
BEGIN
    SELECT 
        product_name, 
        list_price
    FROM 
        production.products
    ORDER BY 
        product_name;
END;
-- Executing a stored procedure
-- Modifying a stored procedure

ALTER PROCEDURE uspProductList
    AS
    BEGIN
        SELECT 
            product_name, 
            list_price
        FROM 
            production.products
        ORDER BY 
            list_price 
    END;
GO
EXEC uspProductList;
-- Deleting a stored procedure

DROP PROCEDURE uspProductList;





















