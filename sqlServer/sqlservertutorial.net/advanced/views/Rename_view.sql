-- SQL Server Rename View
-- SQL Server rename view using Transact-SQL

EXEC sp_rename 
    @objname = 'sales.product_info',
    @newname = 'product_list';
