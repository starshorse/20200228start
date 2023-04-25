-- SQL Server Synonym

-- SQL Server CREATE SYNONYM statement syntax
-- SQL Server CREATE SYNONYM statement examples
-- A) Creating a synonym within the same database example
DROP SYNONYM orders;

CREATE SYNONYM orders FOR "sales.orders";
GO

SELECT * FROM orders;

-- B) Creating a synonym for a table in another database
CREATE DATABASE test;
GO

USE test;
GO
CREATE SCHEMA purchasing;
GO
CREATE TABLE purchasing.suppliers
(
    supplier_id   INT
    PRIMARY KEY IDENTITY, 
    supplier_name NVARCHAR(100) NOT NULL
);

/*
After that, from the BikeStores database, create a synonym for the purchasing.suppliers table in the test database:
*/
USE BikeStores

CREATE SYNONYM suppliers 
FOR test.purchasing.suppliers;

SELECT * FROM suppliers;

-- Listing all synonyms of a database
-- A) Listing synonyms using Transact-SQL command
GO
SELECT 
    name, 
    base_object_name, 
    type
FROM 
    sys.synonyms
ORDER BY 
    name;
-- B) Listing synonyms using SQL Server Management Studio

-- Removing a synonym

DROP SYNONYM IF EXISTS orders;




