-- SQL Server GUID

SELECT 
    NEWID() AS GUID;

GO
DECLARE 
    @id UNIQUEIDENTIFIER;

SET @id = NEWID();

SELECT 
    @id AS GUID;
GO
-- Using SQL Server GUID as primary key
-- SQL Server GUID example

CREATE SCHEMA marketing;
GO

CREATE TABLE marketing.customers2(
    customer_id UNIQUEIDENTIFIER DEFAULT NEWID(),
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL
);
GO
INSERT INTO 
    marketing.customers2( first_name, last_name, email)
VALUES
    ('John','Doe','john.doe@example.com'),
    ('Jane','Doe','jane.doe@example.com');
GO

SELECT 
    customer_id, 
    first_name, 
    last_name, 
    email
FROM 
    marketing.customers2;







