-- SQL Server DROP TABLE

-- SQL Server DROP TABLE examples
-- 
-- A) Drop a table that does not exist

DROP TABLE IF EXISTS sales.revenues;
GO

-- B) Drop a single table example
CREATE TABLE sales.delivery (
    delivery_id INT PRIMARY KEY,
    delivery_note VARCHAR (255) NOT NULL,
    delivery_date DATE NOT NULL
);
GO
DROP TABLE sales.delivery;
GO
-- C) Drop a table with a foreign key constraint example
CREATE SCHEMA procurement;
GO

CREATE TABLE procurement.supplier_groups (
    group_id INT IDENTITY PRIMARY KEY,
    group_name VARCHAR (50) NOT NULL
);

CREATE TABLE procurement.suppliers (
    supplier_id INT IDENTITY PRIMARY KEY,
    supplier_name VARCHAR (50) NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES procurement.supplier_groups (group_id)
);
GO
DROP TABLE procurement.supplier_groups;
GO
DROP TABLE procurement.suppliers;
DROP TABLE procurement.supplier_groups;
GO
DROP TABLE procurement.suppliers, procurement.supplier_groups;






