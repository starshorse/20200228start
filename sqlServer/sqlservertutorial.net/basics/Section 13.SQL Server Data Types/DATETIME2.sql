-- SQL Server DATETIME2

-- YYYY-MM-DD hh:mm:ss[.fractional seconds]
-- SQL Server DATETIME2 example

CREATE TABLE production.product_colors (
    color_id INT PRIMARY KEY IDENTITY,
    color_name VARCHAR (50) NOT NULL,
    created_at DATETIME2
);
GO
INSERT INTO production.product_colors (color_name, created_at)
VALUES
    ('Red', GETDATE()); 
GO
INSERT INTO production.product_colors (color_name, created_at)
VALUES
    ('Green', '2018-06-23 07:30:20');
GO
select * from production.product_colors
/*
If you want to set the default value of the created_at column to the current date and time, you use the following ALTER TABLE statement:
*/
ALTER TABLE production.product_colors 
ADD CONSTRAINT df_current_time 
DEFAULT CURRENT_TIMESTAMP FOR created_at;
GO
INSERT INTO production.product_colors (color_name)
VALUES
    ('Blue');
