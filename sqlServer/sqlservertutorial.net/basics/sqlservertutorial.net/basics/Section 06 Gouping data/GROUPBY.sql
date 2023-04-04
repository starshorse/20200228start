-- SQL Server GROUP BY
SELECT
    customer_id,
    YEAR (order_date) order_year
FROM
    "sales.orders"
WHERE
    customer_id IN (1, 2)
ORDER BY
    customer_id;
GO
SELECT
    customer_id,
    YEAR (order_date) order_year
FROM
    "sales.orders"
WHERE
    customer_id IN (1, 2)
GROUP BY
    customer_id,
    YEAR (order_date)
ORDER BY
    customer_id;
GO
SELECT DISTINCT
    customer_id,
    YEAR (order_date) order_year
FROM
    "sales.orders"
WHERE
    customer_id IN (1, 2)
ORDER BY
    customer_id;
GO
-- SQL Server GROUP BY clause and aggregate functions
SELECT
    customer_id,
    YEAR (order_date) order_year,
	DATEPART(Month, order_date ) order_month,
    COUNT (order_id) order_placed
FROM
    "sales.orders"
WHERE
    customer_id IN (1, 2)
GROUP BY
    customer_id,
    YEAR (order_date),
	DATEPART(Month, order_date )
ORDER BY
    order_year , order_month
GO
/*
If you want to reference a column or expression that is not listed in the GROUP BY clause, you must use that column as the input of an aggregate function. 
Otherwise, you will get an error because there is no guarantee that the column or expression will return a single value per group. 
For example, the following query will fail:
*/
SELECT
    customer_id,
    YEAR (order_date) order_year,
    order_status
FROM
    "sales.orders"
WHERE
    customer_id IN (1, 2)
GROUP BY
    customer_id,
    YEAR (order_date)
ORDER BY
    customer_id;
GO
-- More GROUP BY clause example 
-- Using GROUP BY clause with the COUNT() function example
SELECT
    city,
    COUNT (customer_id) customer_count
FROM
    "sales.customers"
GROUP BY
    city
ORDER BY
    city;
GO
SELECT
    city,
    state,
    COUNT (customer_id) customer_count
FROM
    "sales.customers"
GROUP BY
    state,
    city
ORDER BY
    city,
    state;
GO
-- Using GROUP BY clause with the MIN and MAX functions example
SELECT
    brand_name,
    MIN (list_price) min_price,
    MAX (list_price) max_price
FROM
    "production.products" p
INNER JOIN "production.brands" b ON b.brand_id = p.brand_id
WHERE
    model_year = 2018
GROUP BY
    brand_name
ORDER BY
    brand_name;
GO
-- Using GROUP BY clause with the AVG() function example
SELECT
    brand_name,
    AVG (list_price) avg_price
FROM
    "production.products" p
INNER JOIN "production.brands" b ON b.brand_id = p.brand_id
WHERE
    model_year = 2018
GROUP BY
    brand_name
ORDER BY
    brand_name;
GO
-- Using GROUP BY clause with SUM function example
SELECT
    order_id,
    SUM (
        quantity * list_price * (1 - discount)
    ) net_value
FROM
    "sales.order_items"
GROUP BY
    order_id;
GO