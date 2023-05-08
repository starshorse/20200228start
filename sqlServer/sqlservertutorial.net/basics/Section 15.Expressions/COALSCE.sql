-- SQL Server COALESCE
-- A) Using SQL Server COALESCE expression with character string data example
SELECT 
    COALESCE(NULL, 'Hi', 'Hello', NULL) result;

GO
-- B) Using SQL Server COALESCE expression with the numeric data example
SELECT 
    COALESCE(NULL, NULL, 100, 200) result;
GO
-- C) Using SQL Server COALESCE expression to substitute NULL by new values
SELECT 
    first_name, 
    last_name, 
    phone, 
    email
FROM 
    "sales.customers"
ORDER BY 
    first_name, 
    last_name;
GO
SELECT 
    first_name, 
    last_name, 
    COALESCE(phone,'N/A') phone, 
    email
FROM 
    "sales.customers"
ORDER BY 
    first_name, 
    last_name;

GO
-- D) Using SQL Server COALESCE expression to use the available data
CREATE TABLE salaries (
    staff_id INT PRIMARY KEY,
    hourly_rate decimal,
    weekly_rate decimal,
    monthly_rate decimal,
    CHECK(
        hourly_rate IS NOT NULL OR 
        weekly_rate IS NOT NULL OR 
        monthly_rate IS NOT NULL)
);
GO
INSERT INTO 
    salaries(
        staff_id, 
        hourly_rate, 
        weekly_rate, 
        monthly_rate
    )
VALUES
    (1,20, NULL,NULL),
    (2,30, NULL,NULL),
    (3,NULL, 1000,NULL),
    (4,NULL, NULL,6000),
    (5,NULL, NULL,6500);
GO
SELECT
    staff_id, 
    hourly_rate, 
    weekly_rate, 
    monthly_rate
FROM
    salaries
ORDER BY
    staff_id;
GO
SELECT
    staff_id,
    COALESCE(
        hourly_rate*22*8, 
        weekly_rate*4, 
        monthly_rate
    ) monthly_salary
FROM
    salaries;

-- COALESCE vs. CASE expression
/*

The COALESCE expression is a syntactic sugar of the CASE expression.

The following expressions return the same result:

COALESCE(e1,e2,e3)

CASE
    WHEN e1 IS NOT NULL THEN e1
    WHEN e2 IS NOT NULL THEN e2
    ELSE e3
END


*/



























