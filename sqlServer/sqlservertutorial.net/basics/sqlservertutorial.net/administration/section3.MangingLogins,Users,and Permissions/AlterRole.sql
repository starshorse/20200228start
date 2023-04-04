SELECT
  r.name role_name,
  r.type role_type,
  r.type_desc role_type_desc,
  m.name member_name,
  m.type member_type,
  m.type_desc meber_type_desc
FROM sys.database_principals r
INNER JOIN sys.database_role_members rm ON rm.role_principal_id = r.principal_id
INNER JOIN sys.database_principals m ON m.principal_id = rm.member_principal_id
GO
SELECT
  r.name role_name,
  r.type role_type,
  r.type_desc role_type_desc,
  m.name member_name,
  m.type member_type,
  m.type_desc meber_type_desc
FROM sys.database_principals r
INNER JOIN sys.database_role_members rm ON rm.role_principal_id = r.principal_id
INNER JOIN sys.database_principals m ON m.principal_id = rm.member_principal_id
WHERE r.name ='manufacturing';
GO
