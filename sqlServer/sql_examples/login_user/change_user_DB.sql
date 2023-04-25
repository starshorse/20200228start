ALTER LOGIN anthony WITH DEFAULT_DATABASE = ezchemtech
-- Exec sp_defaultdb @loginame='alice', @defdb='ezchemtech' 

SELECT * FROM [sys].[schemas] WHERE [principal_id] = USER_ID('tony')
GO
ALTER AUTHORIZATION ON SCHEMA::report to dbo;

USE HR
drop user tony
GO
USE ezchemtech
create user anthony from login anthony 
exec sp_addrolemember 'db_owner', 'anthony' ;
-- alter authorization on database::ezchemtech to anthony;