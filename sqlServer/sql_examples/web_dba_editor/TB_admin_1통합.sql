DECLARE @name NVARCHAR(MAX);
DECLARE @USE_TEMPLATE NVARCHAR(MAX); 
DECLARE	@SQLString NVARCHAR(MAX);
DECLARE dbs_list CURSOR 
FOR SELECT [name]
FROM master.sys.databases 
WHERE HAS_DBACCESS([name])=1 AND name NOT IN('model','master','tempdb','msdb','common','config','ezchemtech_dev','ezchemtech_scraping_log', 'ezparts', 'numberonetax') 

OPEN dbs_list;
FETCH NEXT FROM dbs_list INTO 
	@name
DROP TABLE IF EXISTS ##All_admin_1
CREATE TABLE  ##All_admin_1 ( db_name NVARCHAR(20) ,name NVARCHAR(20) , password NVARCHAR(50), email NVARCHAR(50)) 
	SET @USE_TEMPLATE = 'USE {db_name}; INSERT INTO ##All_admin_1(db_name, name, password , email ) SELECT db_name = ''{db_name}'', name,password, email FROM TB_admin_1';
WHILE @@FETCH_STATUS = 0 
	BEGIN
	    PRINT @name
		SET @SQLString = REPLACE( @USE_TEMPLATE, '{db_name}', @name );
	    PRINT @SQLString 
		EXECUTE ( @SQLString ) ; 
		FETCH NEXT FROM dbs_list INTO
			@name 
	END 
CLOSE dbs_list;
DEALLOCATE dbs_list;
SELECT * from ##All_admin_1 