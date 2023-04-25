-- SQL Server TRUNCATE TABLE

-- Introduction to SQL Server TRUNCATE TABLE statement

CREATE TABLE sales.customer_groups (
    group_id INT PRIMARY KEY IDENTITY,
    group_name VARCHAR (50) NOT NULL
);

INSERT INTO sales.customer_groups (group_name)
VALUES
    ('Intercompany'),
    ('Third Party'),
    ('One time');
GO
DELETE FROM sales.customer_groups;

GO
INSERT INTO sales.customer_groups (group_name)
VALUES
    ('Intercompany'),
    ('Third Party'),
    ('One time');   

TRUNCATE TABLE sales.customer_groups;
GO
select * from sales.customer_groups;
GO
INSERT INTO sales.customer_groups (group_name)
VALUES
    ('Intercompany'),
    ('Third Party'),
    ('One time');   

TRUNCATE TABLE sales.customer_groups;
-- TRUNCATE TABLE vs. DELETE
/*
1) Use less transaction log
The DELETE statement removes rows one at a time and inserts an entry in the transaction log for each removed row. On the other hand, the TRUNCATE TABLE statement deletes the data by deallocating the data pages used to store the table data and inserts only the page deallocations in the transaction logs.

2) Use fewer locks
When the DELETE statement is executed using a row lock, each row in the table is locked for removal. The TRUNCATE TABLE locks the table and pages, not each row.

3) Identity reset
If the table to be truncated has an identity column, the counter for that column is reset to the seed value when data is deleted by the TRUNCATE TABLE statement but not the DELETE statement.

In this tutorial, you have learned how to use the TRUNCATE TABLE statement to delete all rows from a table faster and more efficiently.

*/





