-- SQL Server Indexes with Included Columns

CREATE UNIQUE INDEX ix_cust_email 
ON "sales.customers"(email);

GO
SELECT    
    customer_id, 
    email
FROM    
    "sales.customers"
WHERE 
    email = 'aide.franco@msn.com';

GO
SELECT    
	first_name,
	last_name, 
	email
FROM    
	"sales.customers"
WHERE email = 'aide.franco@msn.com';
GO
DROP INDEX ix_cust_email 
ON "sales.customers";
GO
CREATE UNIQUE INDEX ix_cust_email_inc
ON "sales.customers"(email)
INCLUDE(first_name,last_name);

-- The syntax for creating an index with included columns
/*
CREATE [UNIQUE] INDEX index_name
ON table_name(key_column_list)
INCLUDE(included_column_list);
*/









