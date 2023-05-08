-- SQL Server CHECK Constraint

CREATE SCHEMA test;
GO

DROP TABLE test.products

CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2) CHECK(unit_price > 0)
);
-- You can also assign the constraint a separate name by using the CONSTRAINT keyword as follows:
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2) CONSTRAINT positive_price CHECK(unit_price > 0)
);
GO

INSERT INTO test.products(product_name, unit_price)
VALUES ('Awesome Free Bike', 0);
GO

INSERT INTO test.products(product_name, unit_price)
VALUES ('Awesome Bike', 599);

-- SQL Server CHECK constraint and NULL

INSERT INTO test.products(product_name, unit_price)
VALUES ('Another Awesome Bike', NULL);

Select * from test.products

-- CHECK constraint referring to multiple columns
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2) CHECK(unit_price > 0),
    discounted_price DEC(10,2) CHECK(discounted_price > 0),
    CHECK(discounted_price < unit_price)
);
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2),
    discounted_price DEC(10,2),
    CHECK(unit_price > 0),
    CHECK(discounted_price > 0),
    CHECK(discounted_price > unit_price)
);
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2),
    discounted_price DEC(10,2),
    CHECK(unit_price > 0),
    CHECK(discounted_price > 0 AND discounted_price > unit_price)
);
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2),
    discounted_price DEC(10,2),
    CHECK(unit_price > 0),
    CHECK(discounted_price > 0),
    CONSTRAINT valid_prices CHECK(discounted_price > unit_price)
);

-- Add CHECK constraints to an existing table
DROP TABLE test.products
CREATE TABLE test.products(
    product_id INT IDENTITY PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    unit_price DEC(10,2) NOT NULL
);
ALTER TABLE test.products
ADD CONSTRAINT positive_price CHECK(unit_price > 0);

ALTER TABLE test.products
ADD discounted_price DEC(10,2)
CHECK(discounted_price > 0);

ALTER TABLE test.products
ADD CONSTRAINT valid_price 
CHECK(unit_price > discounted_price);

-- Remove CHECK constraints
EXEC sp_help 'test.products';
ALTER TABLE test.products
DROP CONSTRAINT positive_price;

-- Disable CHECK constraints for insert or update
ALTER TABLE test.products
NOCHECK CONSTRAINT valid_price;





















