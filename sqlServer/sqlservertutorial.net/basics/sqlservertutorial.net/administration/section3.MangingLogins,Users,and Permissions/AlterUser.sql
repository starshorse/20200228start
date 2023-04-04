-- Instroduction to the SQL Server ALTER USER statement. 
-- # Rename a user
CREATE LOGIN zack 
WITH PASSWORD = 'Zu$c3suik.';
GO
CREATE USER zack
FOR LOGIN zack;
GO
ALTER USER zack
WITH NAME = zachary;
GO
-- # Change the default schema 
ALTER USER zachary
WITH DEFAULT_SCHEMA = sales;
GO
-- # Map the user with another login account. 
CREATE LOGIN zachary
WITH PASSWORD = 'Na%c8suik#';
GO
ALTER USER zachary
WITH LOGIN = zachary;
GO
-- # Changing serveral options at once. 
ALTER USER zachary
WITH NAME = zack,
     LOGIN = zack,
     DEFAULT_SCHEMA = production;