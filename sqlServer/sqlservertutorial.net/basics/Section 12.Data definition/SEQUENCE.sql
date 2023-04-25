-- SQL Server Sequence
-- What is a sequence
-- SQL Server CREATE SEQUENCE statement
-- SQL Server Sequence examples

-- A) Creating a simple sequence example

CREATE SEQUENCE item_counter
    AS INT
    START WITH 10
    INCREMENT BY 10;

GO
SELECT NEXT VALUE FOR item_counter;

-- B) Using a sequence object in a single table example
CREATE SCHEMA procurement;
GO

CREATE TABLE procurement.purchase_orders(
    order_id INT PRIMARY KEY,
    vendor_id int NOT NULL,
    order_date date NOT NULL
);
GO
CREATE SEQUENCE procurement.order_number 
AS INT
START WITH 1
INCREMENT BY 1;
GO

INSERT INTO procurement.purchase_orders
    (order_id,
    vendor_id,
    order_date)
VALUES
    (NEXT VALUE FOR procurement.order_number,1,'2019-04-30');


INSERT INTO procurement.purchase_orders
    (order_id,
    vendor_id,
    order_date)
VALUES
    (NEXT VALUE FOR procurement.order_number,2,'2019-05-01');


INSERT INTO procurement.purchase_orders
    (order_id,
    vendor_id,
    order_date)
VALUES
    (NEXT VALUE FOR procurement.order_number,3,'2019-05-02');

GO
SELECT 
    order_id, 
    vendor_id, 
    order_date
FROM 
    procurement.purchase_orders;
GO

-- C) Using a sequence object in multiple tables example

CREATE SEQUENCE procurement.receipt_no
START WITH 1
INCREMENT BY 1;
GO

CREATE TABLE procurement.goods_receipts
(
    receipt_id   INT	PRIMARY KEY 
        DEFAULT (NEXT VALUE FOR procurement.receipt_no), 
    order_id     INT NOT NULL, 
    full_receipt BIT NOT NULL,
    receipt_date DATE NOT NULL,
    note NVARCHAR(100),
);


CREATE TABLE procurement.invoice_receipts
(
    receipt_id   INT PRIMARY KEY
        DEFAULT (NEXT VALUE FOR procurement.receipt_no), 
    order_id     INT NOT NULL, 
    is_late      BIT NOT NULL,
    receipt_date DATE NOT NULL,
    note NVARCHAR(100)
);
GO
INSERT INTO procurement.goods_receipts(
    order_id, 
    full_receipt,
    receipt_date,
    note
)
VALUES(
    1,
    1,
    '2019-05-12',
    'Goods receipt completed at warehouse'
);
INSERT INTO procurement.goods_receipts(
    order_id, 
    full_receipt,
    receipt_date,
    note
)
VALUES(
    1,
    0,
    '2019-05-12',
    'Goods receipt has not completed at warehouse'
);

INSERT INTO procurement.invoice_receipts(
    order_id, 
    is_late,
    receipt_date,
    note
)
VALUES(
    1,
    0,
    '2019-05-13',
    'Invoice duly received'
);
INSERT INTO procurement.invoice_receipts(
    order_id, 
    is_late,
    receipt_date,
    note
)
VALUES(
    2,
    0,
    '2019-05-15',
    'Invoice duly received'
);

SELECT * FROM procurement.goods_receipts;
SELECT * FROM procurement.invoice_receipts;

-- Sequence vs. Identity columns
-- When to use sequences
-- Getting sequences information

SELECT 
    * 
FROM 
    sys.sequences;
GO
















