-- SQL Server FOREIGN KEY

CREATE TABLE procurement.vendor_groups (
    group_id INT IDENTITY PRIMARY KEY,
    group_name VARCHAR (100) NOT NULL
);

CREATE TABLE procurement.vendors (
        vendor_id INT IDENTITY PRIMARY KEY,
        vendor_name VARCHAR(100) NOT NULL,
        group_id INT NOT NULL,
);
GO
DROP TABLE procurement.vendors;

CREATE TABLE procurement.vendors (
        vendor_id INT IDENTITY PRIMARY KEY,
        vendor_name VARCHAR(100) NOT NULL,
        group_id INT NOT NULL,
        CONSTRAINT fk_group FOREIGN KEY (group_id) 
        REFERENCES procurement.vendor_groups(group_id)
);
GO
-- SQL Server FOREIGN KEY constraint syntax
INSERT INTO procurement.vendor_groups(group_name)
VALUES('Third-Party Vendors'),
      ('Interco Vendors'),
      ('One-time Vendors');
GO
INSERT INTO procurement.vendors(vendor_name, group_id)
VALUES('ABC Corp',1);

Select * from procurement.vendors
select * from procurement.vendor_groups;

INSERT INTO procurement.vendors(vendor_name, group_id)
VALUES('XYZ Corp',4);

-- Referential actions
/*
FOREIGN KEY (foreign_key_columns)
    REFERENCES parent_table(parent_key_columns)
    ON UPDATE action 
    ON DELETE action;

*/
