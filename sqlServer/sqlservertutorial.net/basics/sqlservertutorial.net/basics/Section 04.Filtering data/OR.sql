-- SQL Server OR
-- A) Using OR operator example
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price < 200
OR list_price > 6000
ORDER BY
    list_price;
GO
-- B) Using multiple OR operators example
SELECT
    product_name,
    brand_id
FROM
    "production.products"
WHERE
    brand_id = 1
OR brand_id = 2
OR brand_id = 4
ORDER BY
    brand_id DESC;
GO
SELECT
    product_name,
    brand_id
FROM
    "production.products"
WHERE
    brand_id IN (1, 2, 4)
ORDER BY
    brand_id DESC;
GO
-- C) Using OR operator with AND operator example
SELECT 
    product_name, 
    brand_id, 
    list_price
FROM 
    "production.products"
WHERE 
    brand_id = 1
      OR brand_id = 2
      AND list_price > 500
ORDER BY 
    brand_id DESC, 
    list_price;
GO
SELECT
    product_name,
    brand_id,
    list_price
FROM
    "production.products"
WHERE
    (brand_id = 1 OR brand_id = 2)
     AND list_price > 500
ORDER BY
    brand_id;

