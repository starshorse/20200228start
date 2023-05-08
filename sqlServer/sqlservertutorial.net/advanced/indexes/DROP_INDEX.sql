-- SQL Server DROP INDEX

-- SQL Server DROP INDEX statement overview
/*
DROP INDEX [IF EXISTS] index_name
ON table_name;
DROP INDEX [IF EXISTS] 
    index_name1 ON table_name1,
    index_name2 ON table_name2,
    ...;
*/

-- SQL Server DROP INDEX statement examples
--  A) Using SQL Server DROP INDEX to remove one index example

CREATE  INDEX ix_cust_email ON "sales.customers"(email);
DROP INDEX IF EXISTS ix_cust_email
ON "sales.customers";

-- B)Using SQL Server DROP INDEX to remove multiple indexes example
CREATE  INDEX ix_cust_fullname ON "sales.customers"(last_name);
CREATE  INDEX ix_cust_city ON "sales.customers"(city);
DROP INDEX 
    ix_cust_city ON "sales.customers",
    ix_cust_fullname ON "sales.customers";
