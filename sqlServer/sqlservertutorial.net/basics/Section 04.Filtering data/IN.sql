-- SQL Server IN operator examples
-- A) Using SQL Server IN with a list of values example

SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price IN (89.99, 109.99, 159.99)
ORDER BY
    list_price;
GO
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price = 89.99 OR list_price = 109.99 OR list_price = 159.99
ORDER BY
    list_price;
GO
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price NOT IN (89.99, 109.99, 159.99)
ORDER BY
    list_price;
GO
-- B) Using SQL Server IN operator with a subquery example
SELECT
    product_id
FROM
    "production.stocks"
WHERE
    store_id = 1 AND quantity >= 30;
GO
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    product_id IN (
        SELECT
            product_id
        FROM
            "production.stocks"
        WHERE
            store_id = 1 AND quantity >= 30
    )
ORDER BY
    product_name;
GO