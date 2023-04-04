-- #  SQL Server Self Join

-- SQL Server self join examples
-- 1) Using self join to query hierarchical data
SELECT
    e.first_name + ' ' + e.last_name employee,
    m.first_name + ' ' + m.last_name manager
FROM
    "sales.staffs" e
INNER JOIN "sales.staffs" m ON m.staff_id = e.manager_id
ORDER BY
    manager;
GO
SELECT
    e.first_name + ' ' + e.last_name employee,
    m.first_name + ' ' + m.last_name manager
FROM
    "sales.staffs" e
LEFT JOIN "sales.staffs" m ON m.staff_id = e.manager_id
ORDER BY
    manager;
GO
-- 2) Using self join to compare rows within a table
SELECT
    c1.city,
    c1.first_name + ' ' + c1.last_name customer_1,
    c2.first_name + ' ' + c2.last_name customer_2
FROM
    "sales.customers" c1
INNER JOIN "sales.customers" c2 ON c1.customer_id > c2.customer_id
AND c1.city = c2.city
ORDER BY
    city,
    customer_1,
    customer_2;
GO
SELECT
    c1.city,
    c1.first_name + ' ' + c1.last_name customer_1,
    c2.first_name + ' ' + c2.last_name customer_2
FROM
    "sales.customers" c1
INNER JOIN "sales.customers" c2 ON c1.customer_id <> c2.customer_id
AND c1.city = c2.city
ORDER BY
    city,
    customer_1,
    customer_2;
GO
SELECT 
   customer_id, first_name + ' ' + last_name c, 
   city
FROM 
   "sales.customers"
WHERE
   city = 'Albany'
ORDER BY c;
GO
SELECT
    c1.city,
    c1.first_name + ' ' + c1.last_name customer_1,
    c2.first_name + ' ' + c2.last_name customer_2
FROM
    "sales.customers" c1
INNER JOIN "sales.customers" c2 ON c1.customer_id > c2.customer_id
AND c1.city = c2.city
WHERE c1.city = 'Albany'
ORDER BY
    c1.city,
    customer_1,
    customer_2;
GO
SELECT
    c1.city,
    c1.first_name + ' ' + c1.last_name customer_1,
    c2.first_name + ' ' + c2.last_name customer_2
FROM
    "sales.customers" c1
INNER JOIN "sales.customers" c2 ON c1.customer_id > c2.customer_id
AND c1.city = c2.city
WHERE c1.city = 'Albany'
ORDER BY
    c1.city,
    customer_1,
    customer_2;
GO
SELECT
    c1.city,
	c1.first_name + ' ' + c1.last_name customer_1,
    c2.first_name + ' ' + c2.last_name customer_2
FROM
    "sales.customers" c1
INNER JOIN "sales.customers" c2 ON c1.customer_id <> c2.customer_id
AND c1.city = c2.city
WHERE c1.city = 'Albany'
ORDER BY
	c1.city,
    customer_1,
    customer_2;
Go
