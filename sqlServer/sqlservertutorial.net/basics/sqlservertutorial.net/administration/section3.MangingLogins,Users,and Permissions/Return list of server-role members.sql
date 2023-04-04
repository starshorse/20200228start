SELECT	roles.principal_id							AS RolePrincipalID
	,	roles.name									AS RolePrincipalName
	,	server_role_members.member_principal_id		AS MemberPrincipalID
	,	members.name								AS MemberPrincipalName
FROM sys.server_role_members AS server_role_members
INNER JOIN sys.server_principals AS roles
    ON server_role_members.role_principal_id = roles.principal_id
INNER JOIN sys.server_principals AS members 
    ON server_role_members.member_principal_id = members.principal_id  
;