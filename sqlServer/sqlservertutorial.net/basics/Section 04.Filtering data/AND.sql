-- # SQL Server AND operator examples
-- A) Using AND operator example
SELECT
    *
FROM
    "production.products"
WHERE
    category_id = 1
AND list_price > 400
ORDER BY
    list_price DESC;
GO
-- B) Using multiple AND operators example
SELECT
    *
FROM
    "production.products"
WHERE
    category_id = 1
AND list_price > 400
AND brand_id = 1
ORDER BY
    list_price DESC;
GO
-- C) Using the AND operator with other logical operators
SELECT
    *
FROM
    "production.products"
WHERE
    brand_id = 1
OR brand_id = 2
AND list_price > 1000
ORDER BY
    brand_id DESC;
GO
SELECT
    *
FROM
    "production.products"
WHERE
    (brand_id = 1 OR brand_id = 2)
AND list_price > 1000
ORDER BY
    brand_id;
