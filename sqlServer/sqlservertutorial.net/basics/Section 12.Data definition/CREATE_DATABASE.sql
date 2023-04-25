-- SQL Server CREATE DATABASE

-- Creating a new database using the CREATE DATABASE statement

CREATE DATABASE TestDb;
GO
SELECT 
    name
FROM 
    master.sys.databases
ORDER BY 
    name;
GO
EXEC sp_databases;
GO



