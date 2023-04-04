Select 
  [name]
From
  sysusers
Where
  issqlrole = 1 AND name NOT IN ( 'db_accessadmin' , 'db_backupoperator' , 'db_ddladmin', 'public', 'db_owner' ,'db_securityadmin' )