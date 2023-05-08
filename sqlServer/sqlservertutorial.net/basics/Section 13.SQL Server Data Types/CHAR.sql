-- SQL Server CHAR Data Type

-- SQL Server CHAR data type example

CREATE TABLE test.sql_server_char (
    val CHAR(3)
);
INSERT INTO test.sql_server_char (val)
VALUES
    ('ABC');
INSERT INTO test.sql_server_char (val)
VALUES
    ('XYZ1');

INSERT INTO test.sql_server_char (val)
VALUES
    ('A');
/*
Even though the character ¡®A¡¯ is only one character, the number of bytes of the column is fixed which is three.
*/
SELECT
    val,
    LEN(val) len,
    DATALENGTH(val) data_length
FROM
    test.sql_server_char;