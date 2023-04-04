-- # SQL Server DROP LOGIN statement example. 
CREATE LOGIN jack
WITH PASSWORD = 'iOvT84xn.';
GO
DROP LOGIN jack;
GO
-- # Using the DROP LOGIN statement to remove a login that maps to a database user
CREATE LOGIN joe
WITH PASSWORD = 'NBgs23we$';
GO
CREATE USER joe
FOR LOGIN joe;
GO
DROP LOGIN joe;
-- The user joe becomes orphaned.
-- To get all orphaned users in the current database server, you use the following query:
SELECT
  dp.type_desc,
  dp.sid,
  dp.name AS user_name
FROM sys.database_principals AS dp
LEFT JOIN sys.server_principals AS sp
  ON dp.sid = sp.sid
WHERE sp.sid IS NULL
AND dp.authentication_type_desc = 'INSTANCE';
GO
-- # Resolve an orphanded user .. 
CREATE LOGIN ocean
WITH PASSWORD = 'bNHXUYT321#',
	 SID = 0x42F85BBCC8D2124CAC4EA504268CD958;
GO