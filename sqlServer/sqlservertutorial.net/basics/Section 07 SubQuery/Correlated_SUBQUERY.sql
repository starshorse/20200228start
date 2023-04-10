-- SQL Server Correlated Subquery
-- A correlated subquery is a subquery that uses the values of the outer query

SELECT
    product_name,
    list_price,
    category_id
FROM
    "production.products" p1
WHERE
    list_price IN (
        SELECT
            MAX (p2.list_price)
        FROM
            "production.products" p2
        WHERE
            p2.category_id = p1.category_id
        GROUP BY
            p2.category_id
    )
ORDER BY
    category_id,
    product_name;
GO