SELECT
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    first_name;
GO
SELECT
	first_name,
	last_name
FROM
	"sales.customers"
ORDER BY
	first_name DESC;
GO
-- C) Sort a result set by multiple columns 
SELECT
    city,
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    city,
    first_name;
GO
-- D) Sort a result set by mulitple columns and different orders 
SELECT
    city,
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    city DESC,
    first_name ASC;
GO
-- E) Sort a result set by a column that is not in the select list. 
SELECT
    city,
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    state;
GO
-- F) Sort a result set by an expression. 
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    LEN(first_name) DESC;
GO
-- G) Sort by ordinal positions of columns 
SELECT
    first_name,
    last_name
FROM
    "sales.customers"
ORDER BY
    1,
    2;


