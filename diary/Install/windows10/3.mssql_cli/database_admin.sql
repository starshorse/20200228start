SELECT @@Servername as ServerName, db_name() as DBName,Roles.Name, Roles.Type_Desc as RDesc, Members.Name MemberName, Members.Type_Desc as MDesc
FROM sys.database_role_members RoleMembers
INNER JOIN sys.database_principals Roles ON Roles.Principal_Id = RoleMembers.Role_Principal_Id
INNER JOIN sys.database_principals Members ON Members.Principal_Id =RoleMembers.Member_Principal_Id