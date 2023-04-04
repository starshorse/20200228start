-- # SQL Server Inner Join
SELECT
    product_name,
    list_price,
    category_id
FROM
    "production.products"
ORDER BY
    product_name DESC;
GO
SELECT
    product_name,
    category_name,
    list_price
FROM
    "production.products" p
INNER JOIN "production.categories" c 
    ON c.category_id = p.category_id
ORDER BY
    product_name DESC;
-- The following statement uses two INNER JOIN clauses to query data from the three tables:
GO
SELECT
    product_name,
    category_name,
    brand_name,
    list_price
FROM
    "production.products" p
INNER JOIN "production.categories" c ON c.category_id = p.category_id
INNER JOIN "production.brands" b ON b.brand_id = p.brand_id
ORDER BY
    product_name DESC;

