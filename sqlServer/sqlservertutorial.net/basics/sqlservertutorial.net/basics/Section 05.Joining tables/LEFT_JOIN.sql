-- # SQL Server Left Join
-- Introduction to SQL Server LEFT JOIN clause
-- SQL Server LEFT JOIN example

SELECT
    product_name,
    order_id
FROM
    "production.products" p
LEFT JOIN "sales.order_items" o ON o.product_id = p.product_id
ORDER BY
    order_id;
GO
SELECT
    product_name,
    order_id
FROM
    "production.products" p
LEFT JOIN "sales.order_items" o ON o.product_id = p.product_id
WHERE order_id IS NULL
GO
SELECT
    p.product_name,
    o.order_id,
    i.item_id,
    o.order_date
FROM
    "production.products" p
	LEFT JOIN "sales.order_items" i
		ON i.product_id = p.product_id
	LEFT JOIN "sales.orders" o
		ON o.order_id = i.order_id
ORDER BY
    order_id;
GO
--  SQL Server LEFT JOIN: conditions in ON vs. WHERE clause
SELECT
    product_name,
    order_id
FROM
    "production.products" p
LEFT JOIN "sales.order_items" o 
   ON o.product_id = p.product_id
WHERE order_id = 100
ORDER BY
    order_id;
GO
SELECT
    p.product_id,
    product_name,
    order_id
FROM
    "production.products" p
    LEFT JOIN "sales.order_items" o 
         ON o.product_id = p.product_id AND 
            o.order_id = 100
ORDER BY
    order_id DESC;
GO