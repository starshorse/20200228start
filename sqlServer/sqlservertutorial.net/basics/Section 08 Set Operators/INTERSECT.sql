-- SQL Server INTERSECT
-- SQL Server INTERSECT example

SELECT
    city
FROM
    "sales.customers"
INTERSECT
SELECT
    city
FROM
    "sales.stores"
ORDER BY
    city;
GO


