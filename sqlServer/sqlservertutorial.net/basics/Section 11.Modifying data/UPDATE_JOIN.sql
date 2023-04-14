-- SQL Server UPDATE JOIN
-- SQL Server UPDATE JOIN syntax

-- SQL Server UPDATE JOIN examples
-- Setting up sample tables

DROP TABLE IF EXISTS sales.targets;

CREATE TABLE sales.targets
(
    target_id  INT	PRIMARY KEY, 
    percentage DECIMAL(4, 2) 
        NOT NULL DEFAULT 0
);

INSERT INTO 
    sales.targets(target_id, percentage)
VALUES
    (1,0.2),
    (2,0.3),
    (3,0.5),
    (4,0.6),
    (5,0.8);
GO
CREATE TABLE sales.commissions
(
    staff_id    INT PRIMARY KEY, 
    target_id   INT, 
    base_amount DECIMAL(10, 2) 
        NOT NULL DEFAULT 0, 
    commission  DECIMAL(10, 2) 
        NOT NULL DEFAULT 0, 
    FOREIGN KEY(target_id) 
        REFERENCES sales.targets(target_id), 
    FOREIGN KEY(staff_id) 
        REFERENCES "sales.staffs"(staff_id),
);
INSERT INTO 
    sales.commissions(staff_id, base_amount, target_id)
VALUES
    (1,100000,2),
    (2,120000,1),
    (3,80000,3),
    (4,900000,4),
    (5,950000,5);
GO
-- A) SQL Server UPDATE INNER JOIN example
UPDATE
    sales.commissions
SET
    sales.commissions.commission = 
        c.base_amount * t.percentage
FROM 
    sales.commissions c
    INNER JOIN sales.targets t
        ON c.target_id = t.target_id;
GO
SELECT 
    *
FROM 
    sales.commissions;
GO
-- B) SQL Server UPDATE LEFT JOIN example
INSERT INTO 
    sales.commissions(staff_id, base_amount, target_id)
VALUES
    (6,100000,NULL),
    (7,120000,NULL);
GO
UPDATE 
    sales.commissions
SET  
    sales.commissions.commission = 
        c.base_amount  * COALESCE(t.percentage,0.1)
FROM  
    sales.commissions c
    LEFT JOIN sales.targets t 
        ON c.target_id = t.target_id;
GO
SELECT 
  * 
FROM 
    sales.commissions;
GO


















