-- SQL Server INSERT INTO SELECT

-- SQL Server INSERT INTO SELECT examples

CREATE TABLE sales.addresses (
    address_id INT IDENTITY PRIMARY KEY,
    street VARCHAR (255) NOT NULL,
    city VARCHAR (50),
    state VARCHAR (25),
    zip_code VARCHAR (5)
);   

-- 1) Insert all rows from another table example
GO
INSERT INTO sales.addresses (street, city, state, zip_code) 
SELECT
    street,
    city,
    state,
    zip_code
FROM
    "sales.customers"
ORDER BY
    first_name,
    last_name; 
GO
SELECT
    *
FROM
    sales.addresses;
-- 2) Insert some rows from another table example
GO 
INSERT INTO 
    sales.addresses (street, city, state, zip_code) 
SELECT
    street,
    city,
    state,
    zip_code
FROM
    "sales.stores"
WHERE
    city IN ('Santa Cruz', 'Baldwin')
-- 3) Insert the top N of rows

/*First, you use the following statement to delete all rows from the addresses table:*/
TRUNCATE TABLE sales.addresses;
INSERT TOP (10) 
INTO sales.addresses (street, city, state, zip_code) 
SELECT
    street,
    city,
    state,
    zip_code
FROM
    "sales.customers"
ORDER BY
    first_name,
    last_name;
GO
-- 4) Insert the top percent of rows
TRUNCATE TABLE sales.addresses;
INSERT TOP (10) PERCENT  
INTO sales.addresses (street, city, state, zip_code) 
SELECT
    street,
    city,
    state,
    zip_code
FROM
    "sales.customers"
ORDER BY
    first_name,
    last_name;

























