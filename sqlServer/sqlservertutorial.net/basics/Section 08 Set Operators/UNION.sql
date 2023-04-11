-- SQL Server UNION
-- UNION vs. UNION ALL

-- UNION vs. JOIN
-- SQL Server UNION examples
SELECT
    first_name,
    last_name
FROM
    "sales.staffs"
UNION
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
GO
SELECT
    COUNT (*)
FROM
    "sales.staffs"
-- 10       

SELECT
    COUNT (*)
FROM
    "sales.customers"
-- 1454
GO
-- To include the duplicate row, you use the UNION ALL as shown in the following query:
SELECT count(*) AS Cnt
FROM (
SELECT
    first_name,
    last_name
FROM
    "sales.staffs"
UNION ALL
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
) AS t
GO
-- UNION and ORDER BY example
SELECT
    first_name,
    last_name
FROM
    "sales.staffs"
UNION ALL
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    first_name,
    last_name;














