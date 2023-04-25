-- SQL Server ALTER TABLE DROP COLUMN

-- Introduction to SQL Server ALTER TABLE DROP COLUMN

-- SQL Server ALTER TABLE DROP COLUMN examples

CREATE TABLE sales.price_lists(
    product_id int,
    valid_from DATE,
    price DEC(10,2) NOT NULL CONSTRAINT ck_positive_price CHECK(price >= 0),
    discount DEC(10,2) NOT NULL,
    surcharge DEC(10,2) NOT NULL,
    note VARCHAR(255),
    PRIMARY KEY(product_id, valid_from)
); 
GO
ALTER TABLE sales.price_lists
DROP COLUMN note;
GO
ALTER TABLE sales.price_lists
DROP COLUMN price;
GO
/* To drop the price column, first, delete its CHECK constraint: */
ALTER TABLE sales.price_lists
DROP CONSTRAINT ck_positive_price;
GO
ALTER TABLE sales.price_lists
DROP COLUMN price;

GO
ALTER TABLE sales.price_lists
DROP COLUMN discount, surcharge;
GO










