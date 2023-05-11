-- SQL Server Indexes on Computed Columns

SELECT    
    first_name,
    last_name,
    email
FROM    
    "sales.customers"
WHERE 
    SUBSTRING(email, 0, 
        CHARINDEX('@', email, 0)
    ) = 'garry.espinoza';
GO
ALTER TABLE "sales.customers"
ADD 
    email_local_part AS 
        SUBSTRING(email, 
            0, 
            CHARINDEX('@', email, 0)
        );
-- Then, create an index on the email_local_part column:
GO
CREATE INDEX ix_cust_email_local_part
ON "sales.customers"(email_local_part);
GO
SELECT    
    first_name,
    last_name,
    email
FROM    
    "sales.customers"
WHERE 
    email_local_part = 'garry.espinoza';
GO











