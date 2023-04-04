-- SQL Server SELECT DISTINCT examples
-- A) DISTINCT one column example
SELECT
    city
FROM
    "sales.customers"
ORDER BY
    city;
GO
SELECT DISTINCT
    city
FROM
    "sales.customers"
ORDER BY
    city;
GO
-- B) DISTINCT multiple columns example
SELECT
    city,
    state
FROM
    "sales.customers"
ORDER BY 
    city, 
    state;
GO
SELECT DISTINCT
    city,
    state
FROM
    "sales.customers"
GO
-- C) DISTINCT with null values example
/*
In this example, the DISTINCT clause kept only one NULL in the phone column and removed the other NULLs.
*/
SELECT DISTINCT
    phone
FROM
    "sales.customers"
ORDER BY
    phone;
GO
-- DISTINCT vs. GROUP BY
SELECT 
	city, 
	state, 
	zip_code
FROM 
	"sales.customers"
GROUP BY 
	city, state, zip_code
ORDER BY
	city, state, zip_code
GO
SELECT 
	DISTINCT 
       city, 
       state, 
       zip_code
FROM 
	"sales.customers";






