CREATE LOGIN bobcat
WITH PASSWORD = 'Mou$eY2k.';
GO
-- # Disable a login 
ALTER LOGIN bobcat
DISABLE;
GO

-- # Enable a disabled login 
ALTER LOGIN bobcat
ENABLE;
GO
-- # Rename a login 
ALTER LOGIN bobcat
WITH NAME = lion;
GO
-- # Change the password of a login 
ALTER LOGIN lion
WITH PASSWORD = 'Hor$e2022.';
GO
-- If a login account is currently logged in 
ALTER LOGIN lion
WITH PASSWORD = 'Deer$2022.' 
	 OLD_PASSWORD = 'Hor$e2022.';
GO
-- #Unlock a login 
ALTER LOGIN lion
WITH PASSWORD='Deer$2023.'
UNLOCK;


