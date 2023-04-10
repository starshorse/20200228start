-- SQL Server EXISTS
-- SQL Server EXISTS operator overview
-- SQL Server EXISTS operator examples
-- The following example returns all rows from the  customers table:
-- A) Using EXISTS with a subquery returns NULL example
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    EXISTS (SELECT NULL)
ORDER BY
    first_name,
    last_name;
GO
-- B) Using EXISTS with a correlated subquery example
-- The following example finds all customers who have placed more than two orders:
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers" c
WHERE
    EXISTS (
        SELECT
            COUNT (*)
        FROM
            "sales.orders" o
        WHERE
            customer_id = c.customer_id
        GROUP BY
            customer_id
        HAVING
            COUNT (*) > 2
    )
ORDER BY
    first_name,
    last_name;
GO
-- C) EXISTS vs. IN example
SELECT
    *
FROM
    "sales.orders"
WHERE
    customer_id IN (
        SELECT
            customer_id
        FROM
            "sales.customers"
        WHERE
            city = 'San Jose'
    )
ORDER BY
    customer_id,
    order_date;
GO
SELECT
    *
FROM
    "sales.orders" o
WHERE
    EXISTS (
        SELECT
            customer_id
        FROM
            "sales.customers" c
        WHERE
            o.customer_id = c.customer_id
        AND city = 'San Jose'
    )
ORDER BY
    o.customer_id,
    order_date;
GO
/*
EXISTS vs. JOIN
The EXISTS operator returns TRUE or FALSE while the JOIN clause returns rows from another table.
*/


