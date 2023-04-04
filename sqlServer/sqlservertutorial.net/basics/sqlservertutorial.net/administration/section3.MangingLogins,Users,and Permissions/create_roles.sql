use BikeStores ;

CREATE LOGIN james 
WITH PASSWORD = 'Ux!sa123ayb';
GO
CREATE USER james 
FOR LOGIN james;
GO
CREATE ROLE sales;
GO
GRANT SELECT, INSERT, UPDATE, DELETE 
ON SCHEMA::sales
TO sales;
GO
ALTER ROLE sales
ADD MEMBER james;
GO
SELECT
  name,
  principal_id,
  type,
  type_desc,
  owning_principal_id
FROM sys.database_principals
WHERE type = 'R';
GO
SELECT
  name,
  principal_id,
  type,
  type_desc,
  owning_principal_id
FROM sys.database_principals
WHERE name in ('sales', 'sox_auditors');
GO
SELECT * FROM sys.database_role_members;