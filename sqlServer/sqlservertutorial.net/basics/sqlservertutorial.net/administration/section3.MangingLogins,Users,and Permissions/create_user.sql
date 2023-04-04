-- Introduction to the SQL Server CREATE USER statement.
-- #SQL Server CREATE USER statement.. 
CREATE LOGIN alex
WITH PASSWORD='Uvxs245!';

USE BikeStores;

CREATE USER alex
FOR LOGIN alex;
GO