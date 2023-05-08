-- SQL Server Enable Indexes
-- Enable index using ALTER INDEX and CREATE INDEX statements
/*
This statement uses the ALTER INDEX statement to ¡°enable¡± or rebuild an index on a table:

ALTER INDEX index_name 
ON table_name  
REBUILD;
Code language: SQL (Structured Query Language) (sql)
This statement uses the CREATE INDEX statement to enable the disabled index and recreate it:

CREATE INDEX index_name 
ON table_name(column_list)
WITH(DROP_EXISTING=ON)
Code language: SQL (Structured Query Language) (sql)
The following statement uses the ALTER INDEX statement to enable all disabled indexes on a table:

ALTER INDEX ALL ON table_name
REBUILD;
*/
-- Enable indexes using DBCC DBREINDEX statement
/*

This statement uses the DBCC DBREINDEX to enable an index on a table:

DBCC DBREINDEX (table_name, index_name);
Code language: SQL (Structured Query Language) (sql)
This statement uses the DBCC DBREINDEX to enable all indexes on a table:

DBCC DBREINDEX (table_name, " ");  
*/
-- Enable indexes example
ALTER INDEX ALL ON "sales.customers"
REBUILD;


