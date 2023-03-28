-- # SQL Server CREATE LOGIN statement example 
CREATE LOGIN bob
WITH PASSWORD='Ebe2di68.';

GO
-- To view all the logins of an SQL Server instance, you use the following query: 
SELECT
  sp.name AS login,
  sp.type_desc AS login_type,
  CASE
    WHEN sp.is_disabled = 1 THEN 'Disabled'
    ELSE 'Enabled'
  END AS status,
  sl.password_hash,
  sp.create_date,
  sp.modify_date
FROM sys.server_principals sp
LEFT JOIN sys.sql_logins sl
  ON sp.principal_id = sl.principal_id
WHERE sp.type NOT IN ('G', 'R')
ORDER BY create_date DESC;
GO
--# SQL Server CREATE LOGIN statement options 
-- The CHECK_POLICY option 
-- The CHECK_EXPIREATION option 
-- The MUST_CHANGE option 
CREATE LOGIN alice
WITH PASSWORD = 'UcxSj12.' MUST_CHANGE,
     CHECK_POLICY=ON, 
     CHECK_EXPIRATION=ON;
GO



