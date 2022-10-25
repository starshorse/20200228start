SELECT Roles.Name, Roles.Type_Desc, Members.Name MemberName, Members.Type_Desc
FROM sys.server_role_members RoleMembers
INNER JOIN sys.server_principals Roles ON Roles.Principal_Id = RoleMembers.Role_Principal_Id
INNER JOIN sys.server_principals Members ON Members.Principal_Id = RoleMembers.Member_Principal_Id
where Members.name not like '%system%' 
      and Members.name not like '%SQLServer%' 