-- SQL Server column alias 
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    first_name;
GO
SELECT
    first_name + ' ' + last_name
FROM
    "sales.customers"
ORDER BY
    first_name;
GO
SELECT
    first_name + ' ' + last_name AS full_name
FROM
    "sales.customers"
ORDER BY
    first_name;
GO
SELECT
    first_name + ' ' + last_name AS 'Full Name'
FROM
    "sales.customers"
ORDER BY
    first_name;
GO
SELECT
    category_name 'Product Category'
FROM
    "production.categories";
GO
-- Order by both using. 
SELECT
    category_name 'Product Category'
FROM
    "production.categories"
ORDER BY
    category_name;  
GO
SELECT
    category_name 'Product Category'
FROM
    "production.categories"
ORDER BY
    'Product Category';

-- SQL Server table alias 
GO
SELECT
    "sales.customers".customer_id,
    first_name,
    last_name,
    order_id
FROM
    "sales.customers"
INNER JOIN "sales.orders" ON "sales.orders".customer_id = "sales.customers".customer_id;
GO
SELECT
    c.customer_id,
    first_name,
    last_name,
    order_id
FROM
    "sales.customers" c
INNER JOIN "sales.orders" o ON o.customer_id = c.customer_id;



