-- SQL Server Decimal

-- Overview of SQL Server DECIMAL Data Type
-- SQL Server DECIMAL example

CREATE TABLE test.sql_server_decimal (
    dec_col DECIMAL (4, 2),
    num_col NUMERIC (4, 2)
);
GO
INSERT INTO test.sql_server_decimal (dec_col, num_col)
VALUES
    (10.05, 20.05);
GO
SELECT
    dec_col,
    num_col
FROM
    test.sql_server_decimal;
GO
INSERT INTO test.sql_server_decimal (dec_col, num_col)
VALUES
    (99.999, 12.345);
