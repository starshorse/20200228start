-- SQL Server ALL
-- SQL Server ALL operator examples

SELECT
    AVG (list_price) avg_list_price
FROM
    "production.products"
GROUP BY
    brand_id
ORDER BY
    avg_list_price;
GO
-- 1) scalar_expression > ALL ( subquery )
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price > ALL (
        SELECT
            AVG (list_price) avg_list_price
        FROM
            "production.products"
        GROUP BY
            brand_id
    )
ORDER BY
    list_price;
GO
-- 2) scalar_expression < ALL ( subquery )
SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    list_price < ALL (
        SELECT
            AVG (list_price) avg_list_price
        FROM
            "production.products"
        GROUP BY
            brand_id
    )
ORDER BY
    list_price DESC;
GO



