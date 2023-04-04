-- Introduction to the SQL Server Roles 
-- # Adding a user to a role example 
CREATE LOGIN tiger
WITH PASSWORD='UyxIv.12';
GO
Use BikeStores;

CREATE USER tiger
FOR LOGIN tiger;
GO

ALTER ROLE db_datareader
ADD MEMBER tiger;
/*
The db_datareader is a fixed database role. 
The db_datareader role allows all the members to read data from all user tables and views in the database. 
Technically, it¡¯s equivalent to the following GRANT statement:
*/
GO
GRANT SELECT 
ON DATABASE::BikeStores
TO tiger;
GO
SELECT * FROM "sales.orders";

-- # Create a user-defined role
USE master;

CREATE LOGIN mary 
WITH PASSWORD='XUjxse19!';
GO
USE BikeStores;

CREATE USER mary 
FOR LOGIN mary;
GO

GRANT SELECT 
ON SCHEMA::Sales 
TO sales_report;

ALTER ROLE sales_report
ADD MEMBER tiger;