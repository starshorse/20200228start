-- SQL Server DROP SCHEMA
-- SQL Server DROP SCHEMA statement overview

-- SQL Server DROP SCHEMA statement example

CREATE SCHEMA logistics;
GO
CREATE TABLE logistics.deliveries
(
    order_id        INT
    PRIMARY KEY, 
    delivery_date   DATE NOT NULL, 
    delivery_status TINYINT NOT NULL
);
GO
DROP SCHEMA logistics;

DROP TABLE logistics.deliveries;

DROP SCHEMA IF EXISTS logistics;

