-- SQL Server Disable Indexes
--SQL Server Disable Index statements

-- SQL Server disable index examples

CREATE INDEX ix_cust_city  ON "sales.customers"(city)

ALTER INDEX ix_cust_city 
ON "sales.customers" 
DISABLE;
GO
SELECT    
    first_name, 
    last_name, 
    city
FROM    
    "sales.customers"
WHERE 
    city = 'San Jose';
	
-- B) Disabling all indexes of a table example

ALTER INDEX ALL ON "sales.customers"
DISABLE;
