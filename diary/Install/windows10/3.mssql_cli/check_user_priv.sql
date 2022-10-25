	-- 권한 확인
	USE 데이터베이스;

	GO
	SELECT	T1.[name]	AS USER_NM
		,	T3.[name]	AS OBJECT_NM
		,	T3.[type_desc]
		,	T2.[permission_name]
		,	T2.state_desc				
	FROM	sys.database_principals	AS T1 WITH(NOLOCK)
			INNER JOIN sys.database_permissions	AS T2 WITH(NOLOCK)
				ON	T2.grantee_principal_id = T1.principal_id
			INNER JOIN sys.objects	AS T3 WITH(NOLOCK)
				ON	T3.[object_id] = T2.major_id
	WHERE	T1.[name] = N'유저명'
	AND		T3.[name] = N'Object명'
	;

	-- 권한 부여
	GRANT EXECUTE ON 스키마.Object명 TO 유저명;
	GO