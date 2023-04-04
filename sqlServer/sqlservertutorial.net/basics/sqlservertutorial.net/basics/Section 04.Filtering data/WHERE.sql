-- A) Finding rows by using a simple equality
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    category_id = 1
ORDER BY
    list_price DESC;
GO
-- B) Finding rows that meet two conditions
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    category_id = 1 AND model_year = 2018
ORDER BY
    list_price DESC;
GO
-- C) Finding rows by using a comparison operator
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    list_price > 300 AND model_year = 2018
ORDER BY
    list_price DESC;
GO
-- D) Finding rows that meet any of two conditions
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    list_price > 3000 OR model_year = 2018
ORDER BY
    list_price DESC;
GO
-- E) Finding rows with the value between two values
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    list_price BETWEEN 1899.00 AND 1999.99
ORDER BY
    list_price DESC;
GO
-- F) Finding rows that have a value in a list of values
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    list_price IN (299.99, 369.99, 489.99)
ORDER BY
    list_price DESC;
GO
-- G) Finding rows whose values contain a string
SELECT
    product_id,
    product_name,
    category_id,
    model_year,
    list_price
FROM
    "production.products"
WHERE
    product_name LIKE '%Cruiser%'
ORDER BY
    list_price;
GO


