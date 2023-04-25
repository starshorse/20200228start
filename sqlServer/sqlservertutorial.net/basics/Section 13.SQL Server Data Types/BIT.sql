-- SQL Server BIT

-- Overview of BIT data type

-- SQL Server BIT examples
GO
CREATE SCHEMA test;

CREATE TABLE test.sql_server_bit (
    bit_col BIT
);
INSERT INTO test.sql_server_bit (bit_col)
OUTPUT inserted.bit_col
VALUES(1);
INSERT INTO test.sql_server_bit (bit_col)
OUTPUT inserted.bit_col
VALUES(0);

INSERT INTO test.sql_server_bit (bit_col)
OUTPUT inserted.bit_col
VALUES
    ('True');

INSERT INTO test.sql_server_bit (bit_col)
OUTPUT inserted.bit_col
VALUES
    ('False');
