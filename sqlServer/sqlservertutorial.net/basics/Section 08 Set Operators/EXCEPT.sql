-- SQL Server EXCEPT
-- Introduction to SQL Server EXCEPT operator
-- SQL Server EXCEPT operator example

--A) Simple EXCEPT example

SELECT
    product_id
FROM
    "production.products"
EXCEPT
SELECT
    product_id
FROM
    "sales.order_items"

GO
-- B) EXCEPT with ORDER BY example
SELECT
    product_id
FROM
    "production.products"
EXCEPT
SELECT
    product_id
FROM
    "sales.order_items"
ORDER BY 
	product_id;

GO

