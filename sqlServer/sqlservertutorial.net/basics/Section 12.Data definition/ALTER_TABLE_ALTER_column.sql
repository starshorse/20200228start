-- SQL Server ALTER TABLE ALTER COLUMN

-- Modify column¡¯s data type

CREATE TABLE t1 (c INT);
GO
    INSERT INTO t1
    VALUES
        (1),
        (2),
        (3);
GO
Select * from t1
GO
ALTER TABLE t1 ALTER COLUMN c VARCHAR (2);
GO
INSERT INTO t1
VALUES ('@');
GO
/* Fourth, modify the data type of the column from VARCHAR back to INT: */
ALTER TABLE t1 ALTER COLUMN c INT;
GO
-- Change the size of a column
CREATE TABLE t2 (c VARCHAR(10));
GO
INSERT INTO t2
VALUES
    ('SQL Server'),
    ('Modify'),
    ('Column')
GO
ALTER TABLE t2 ALTER COLUMN c VARCHAR (50);
GO
ALTER TABLE t2 ALTER COLUMN c VARCHAR (5);
GO
-- Add a NOT NULL constraint to nullable column 
CREATE TABLE t3 (c VARCHAR(50));
GO
INSERT INTO t3
VALUES
    ('Nullable column'),
    (NULL);
GO
UPDATE t3
SET c = ''
WHERE
    c IS NULL;
GO
ALTER TABLE t3 ALTER COLUMN c VARCHAR (20) NOT NULL;












