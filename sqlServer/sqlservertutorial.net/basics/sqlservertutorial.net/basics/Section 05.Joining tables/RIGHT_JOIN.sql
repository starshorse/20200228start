-- # SQL Server Right Join
-- Introduction to SQL Server RIGHT JOIN clause
-- SQL Server RIGHT JOIN example

-- SQL Server RIGHT JOIN example
SELECT
    product_name,
    order_id
FROM
    "sales.order_items" o
    RIGHT JOIN "production.products" p 
        ON o.product_id = p.product_id
ORDER BY
    order_id;
GO
SELECT
    product_name,
    order_id
FROM
    "sales.order_items" o
    RIGHT JOIN "production.products" p 
        ON o.product_id = p.product_id
WHERE 
    order_id IS NULL
ORDER BY
    product_name;
