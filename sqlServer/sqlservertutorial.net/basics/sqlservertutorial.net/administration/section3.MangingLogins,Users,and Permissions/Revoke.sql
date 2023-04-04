-- Introduction to the SQL Server Revoke statement. 
-- # SQL Server REVOKE statement example. 
REVOKE DELETE
ON People
FROM peter;
GO
REVOKE SELECT, INSERT
ON People
FROM peter;
