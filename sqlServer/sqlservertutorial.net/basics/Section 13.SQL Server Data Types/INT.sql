-- SQL Server INT

-- SQL Server Integers example

CREATE TABLE test.sql_server_integers (
	bigint_col bigint,
	int_col INT,
	smallint_col SMALLINT,
	tinyint_col tinyint
);
GO
INSERT INTO test.sql_server_integers (
	bigint_col,
	int_col,
	smallint_col,
	tinyint_col
)
VALUES
	(
		9223372036854775807,
		2147483647,
		32767,
		255
	);
GO
SELECT
	bigint_col,
	int_col,
	smallint_col,
	tinyint_col
FROM
	test.sql_server_integers;

-- Converting integer data

SELECT 2147483647 / 3 AS r1, 
	   2147483649 / 3 AS r2;
