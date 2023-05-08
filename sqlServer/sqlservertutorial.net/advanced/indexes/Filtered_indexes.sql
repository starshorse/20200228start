-- SQL Server Filtered Indexes
/*
CREATE INDEX index_name
ON table_name(column_list)
WHERE predicate;

*/
-- SQL Server filtered index example
SELECT 
    SUM(CASE
            WHEN phone IS NULL
            THEN 1
            ELSE 0
        END) AS [Has Phone], 
    SUM(CASE
            WHEN phone IS NULL
            THEN 0
            ELSE 1
        END) AS [No Phone]
FROM 
    "sales.customers";
GO
CREATE INDEX ix_cust_phone
ON "sales.customers"(phone)
WHERE phone IS NOT NULL;
GO
SELECT    
    first_name,
    last_name, 
    phone
FROM    
    "sales.customers"
WHERE phone = '(281) 363-3309';
GO
DROP INDEX ix_cust_phone ON "sales.customers"
CREATE INDEX ix_cust_phone
ON "sales.customers"(phone)
INCLUDE (first_name, last_name)
WHERE phone IS NOT NULL;


-- Benefits of filtered indexes



