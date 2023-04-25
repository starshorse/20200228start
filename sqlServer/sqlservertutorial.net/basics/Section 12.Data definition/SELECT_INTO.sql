-- SQL Server SELECT INTO
-- SQL Server SELECT INTO examples

-- A) Using SQL Server SELECT INTO to copy table within the same database example

CREATE SCHEMA marketing;
GO
SELECT 
    *
INTO 
    marketing.customers
FROM 
    "sales.customers"
GO
SELECT 
    *
FROM 
    marketing.customers;
GO
-- B) Using SQL Server SELECT INTO statement to copy table across databases
CREATE DATABASE TestDb;
GO
SELECT    
    customer_id, 
    first_name, 
    last_name, 
    email
INTO 
    TestDb.dbo.customers
FROM    
    "sales.customers"
WHERE 
    state = 'CA';
GO
SELECT 
    * 
FROM 
    TestDb.dbo.customers;





