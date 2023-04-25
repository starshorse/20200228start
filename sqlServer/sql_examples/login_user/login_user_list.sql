DECLARE @name sysname = N'alex'; -- input param, presumably

DECLARE @sql nvarchar(max) = N'';

SELECT @sql += N'UNION ALL SELECT N''' + REPLACE(name,'''','''''') + ''',
    p.name                 COLLATE SQL_Latin1_General_CP1_CI_AS, 
    p.default_schema_name  COLLATE SQL_Latin1_General_CP1_CI_AS, 
    STUFF((SELECT N'','' + r.name 
      FROM ' + QUOTENAME(name) + N'.sys.database_principals AS r
      INNER JOIN ' + QUOTENAME(name) + N'.sys.database_role_members AS rm
      ON r.principal_id = rm.role_principal_id
      WHERE rm.member_principal_id = p.principal_id
      FOR XML PATH, TYPE).value(N''.[1]'',''nvarchar(max)''),1,1,N'''')
    FROM sys.server_principals AS sp
    LEFT OUTER JOIN ' + QUOTENAME(name) + '.sys.database_principals AS p
    ON sp.sid = p.sid
    WHERE sp.name = @name '
  FROM sys.databases WHERE [state] = 0;

SET @sql = STUFF(@sql, 1, 9, N'');

PRINT @sql;
EXEC master.sys.sp_executesql @sql, N'@name sysname', @name;
GO
DECLARE @login sysname = N'alex';

DECLARE @sql  nvarchar(max), 
        @sid  varbinary(85),
        @coll nvarchar(64) = N'COLLATE SQL_Latin1_General_CP1_CI_AS';

SELECT @sid = [sid] FROM sys.server_principals AS dp WHERE name = @login;

;WITH d AS 
(
  SELECT dbid = CONVERT(varchar(11), database_id),
         qn = QUOTENAME(name)
    FROM sys.databases WHERE [state] = 0
)
SELECT @sql = STRING_AGG(CONVERT(nvarchar(max),
        N'SELECT db = d.name, username = dp.name ' + @coll + ', 
        schemaname = dp.default_schema_name ' + @coll + ',
        roles = STRING_AGG(rp.name ' + @coll + ', N'','')
        FROM sys.databases AS d
        LEFT OUTER JOIN ' + qn + '.sys.database_principals AS dp ON dp.sid = @sid
        LEFT OUTER JOIN ' + qn + '.sys.database_role_members AS rm
        ON dp.principal_id = rm.member_principal_id
        LEFT OUTER JOIN ' + qn + '.sys.database_principals AS rp
        ON rp.principal_id = rm.role_principal_id
        WHERE d.database_id = ' + dbid + N' 
        GROUP BY d.name, dp.name, dp.default_schema_name'
    ), char(13) + char(10) + N' UNION ALL ')
FROM d;

PRINT @sql;
EXEC master.sys.sp_executesql @sql, N'@sid varbinary(85)', @sid;
