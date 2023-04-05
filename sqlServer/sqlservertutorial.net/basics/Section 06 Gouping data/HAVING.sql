-- SQL Server HAVING
/*
Because SQL Server processes the HAVING clause after the GROUP BY clause, 
you cannot refer to the aggregate function specified in the select list by using the column alias. The following query will fail:
Instead, you must use the aggregate function expression in the HAVING clause explicitly as follows:
SELECT
    column_name1,
    column_name2,
    aggregate_function (column_name3) alias
FROM
    table_name
GROUP BY
    column_name1,
    column_name2
HAVING
    aggregate_function (column_name3) > value;
*/

-- SQL Server HAVING with the COUNT function example
