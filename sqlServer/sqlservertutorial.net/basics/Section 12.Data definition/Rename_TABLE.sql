-- SQL Server Rename Table
-- SQL Rename table using Transact SQL

CREATE TABLE sales.contr (
    contract_no INT IDENTITY PRIMARY KEY,
    start_date DATE NOT NULL,
    expired_date DATE,
    customer_id INT,
    amount DECIMAL (10, 2)
); 
GO

EXEC sp_rename 'sales.contr', 'contracts';

