-- Introduction to the  SQL Server GRANT statement .
-- # SQL Server GRANT example. 
USE master;
GO

DROP DATABASE IF EXISTS HR;
GO

CREATE DATABASE HR;
GO

USE HR;

CREATE TABLE People (
  Id int IDENTITY PRIMARY KEY,
  FirstName varchar(50) NOT NULL,
  LastName varchar(50) NOT NULL
);

INSERT INTO People (FirstName, LastName)
  VALUES ('John', 'Doe'),
  ('Jane', 'Doe'),
  ('Upton', 'Luis'),
  ('Dach', 'Keon');
GO
-- Create Login
CREATE LOGIN peter
WITH PASSWORD='XUnVe2di45.';
USE HR;

CREATE USER peter
FOR LOGIN peter;
-- Grant SELECT 
GRANT SELECT 
ON People TO peter;

-- Grant INSERT, DELETE
GRANT INSERT, DELETE
ON People TO peter;