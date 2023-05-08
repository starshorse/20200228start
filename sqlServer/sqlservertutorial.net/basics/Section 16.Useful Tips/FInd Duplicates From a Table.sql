-- Find Duplicates From a Table in SQL Server

-- Setting up a sample table

DROP TABLE IF EXISTS t1;
CREATE TABLE t1 (
    id INT IDENTITY(1, 1), 
    a  INT, 
    b  INT, 
    PRIMARY KEY(id)
);
GO
INSERT INTO
    t1(a,b)
VALUES
    (1,1),
    (1,2),
    (1,3),
    (2,1),
    (1,2),
    (1,3),
    (2,1),
    (2,2);
GO
-- Using GROUP BY clause to find duplicates in a table
SELECT 
    a, 
    b, 
    COUNT(*) occurrences
FROM t1
GROUP BY
    a, 
    b
HAVING 
    COUNT(*) > 1;
GO
WITH cte AS (
    SELECT
        a, 
        b, 
        COUNT(*) occurrences
    FROM t1
    GROUP BY 
        a, 
        b
    HAVING 
        COUNT(*) > 1
)
SELECT 
    t1.id, 
    t1.a, 
    t1.b
FROM t1
    INNER JOIN cte ON 
        cte.a = t1.a AND 
        cte.b = t1.b
ORDER BY 
    t1.a, 
    t1.b;
GO
-- Using ROW_NUMBER() function to find duplicates in a table
WITH cte AS (
    SELECT 
        a, 
        b, 
        ROW_NUMBER() OVER (
            PARTITION BY a,b
            ORDER BY a,b) rownum
    FROM 
        t1
) 
SELECT 
  * 
FROM 
    cte 
WHERE 
    rownum > 1;
GO
/*
WITH cte AS (
    SELECT 
        col,
        ROW_NUMBER() OVER (
            PARTITION BY col
            ORDER BY col) row_num
    FROM 
        t1
) 
SELECT * FROM cte 
WHERE row_num > 1;
*/
















