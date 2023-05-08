-- SQL Server DROP VIEW

-- SQL Server DROP VIEW examples

DROP VIEW IF EXISTS sales.daily_sales;

GO
CREATE VIEW sales.product_catalog
AS
SELECT 
    product_name, 
    category_name, 
	brand_name,
    list_price
FROM 
    "production.products" p
INNER JOIN "production.categories" c 
    ON c.category_id = p.category_id
INNER JOIN "production.brands" b
	ON b.brand_id = p.brand_id;
GO
DROP VIEW IF EXISTS 
    sales.staff_sales, 
    sales.product_catalogs;


