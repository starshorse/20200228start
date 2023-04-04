-- #Introduction to the SQL Server DROP USER statement. 
-- # SQL Server DROP USER statement example. 
-- ## Using the DROP USER to delete a user in the current database example. 
CREATE LOGIN jin
WITH PASSWORD ='uJIKng12.';
GO
CREATE USER jin
FOR LOGIN jin;
GO
DROP USER IF EXISTS jin;
GO
-- ## Drop a user that owns a securable example. 
CREATE LOGIN anthony
WITH PASSWORD ='uNMng78!';
GO
CREATE USER tony
FOR LOGIN anthony;
GO
CREATE SCHEMA report 
AUTHORIZATION tony;
GO
-- [Fourth, connect to the SQL Server using the login anthony and create a table called daily_sales in the schema report:]
USE BikeStores;

CREATE TABLE "report.daily_sales" (
	Id INT IDENTITY PRIMARY KEY,
	Day DATE NOT NULL,
	Amount DECIMAL(10,2) NOT NULL DEFAULT 0
)
GO
DROP USER tony;
/*
SQL Server issued the following error:

The database principal owns a schema in the database, and cannot be dropped.
Code language: SQL (Structured Query Language) (sql)
Because the user tony owns the schema report, the DROP USER statement cannot delete it.

To remove the user tony, you need to transfer the authorization of the schema report to another user first. For example, the following statement changes the authorization of the schema report to the user dbo:

ALTER AUTHORIZATION 
ON SCHEMA::report 
TO dbo;
Code language: SQL (Structured Query Language) (sql)
If you execute the DROP USER statement to delete the user tony, you¡¯ll see that it executes successfully:

DROP USER tony;
*/
ALTER AUTHORIZATION 
ON SCHEMA::report 
TO dbo;
GO
DROP USER tony;

