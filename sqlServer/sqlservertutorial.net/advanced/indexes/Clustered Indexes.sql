-- SQL Server Clustered Indexes

CREATE TABLE production.parts(
    part_id   INT NOT NULL, 
    part_name VARCHAR(100)
);
GO
INSERT INTO 
    production.parts(part_id, part_name)
VALUES
    (1,'Frame'),
    (2,'Head Tube'),
    (3,'Handlebar Grip'),
    (4,'Shock Absorber'),
    (5,'Fork');
GO
SELECT 
    part_id, 
    part_name
FROM 
    production.parts
WHERE 
    part_id = 5;
-- SQL Server Clustered Index and Primary key constraint
CREATE TABLE production.part_prices(
    part_id int,
    valid_from date,
    price decimal(18,4) not null,
    PRIMARY KEY(part_id, valid_from) 
);
GO
ALTER TABLE production.parts
ADD PRIMARY KEY(part_id);
GO
--  sqlserver  drop primary key.. 
ALTER TABLE production.parts DROP CONSTRAINT PK__parts__A0E3FAB8F6073867

CREATE CLUSTERED INDEX ix_parts_id
ON production.parts (part_id);  
GO

