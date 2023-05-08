-- SQL Server CREATE INDEX


-- EXEC sp_rename "'sales.customers'", 'sales.customers'

SELECT 
    customer_id, 
    city
FROM 
    "sales.customers"
WHERE 
    city = 'Atwater';
GO
CREATE INDEX ix_customers_city
ON "sales.customers"(city);

-- B) Using SQL Server CREATE INDEX statement to create a nonclustered index for multiple columns example

SELECT 
    customer_id, 
    first_name, 
    last_name
FROM 
    "sales.customers"
WHERE 
    last_name = 'Berg' AND 
    first_name = 'Monika';

GO

CREATE INDEX ix_customers_name 
ON "sales.customers"(last_name, first_name);
GO
SELECT 
    customer_id, 
    first_name, 
    last_name
FROM 
    "sales.customers"
WHERE 
    last_name = 'Berg' AND 
    first_name = 'Monika';
GO
SELECT 
    customer_id, 
    first_name, 
    last_name
FROM 
    "sales.customers"
WHERE 
    last_name = 'Albert';
GO
SELECT 
    customer_id, 
    first_name, 
    last_name
FROM 
    "sales.customers"
WHERE 
    first_name = 'Adam';
Go

