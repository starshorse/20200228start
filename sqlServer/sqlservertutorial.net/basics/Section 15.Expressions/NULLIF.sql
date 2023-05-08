-- SQL Server NULLIF

-- The NULLIF expression accepts two arguments and returns NULL if two arguments are equal. Otherwise, it returns the first expression.

SELECT 
    NULLIF(10, 10) result;
GO
SELECT 
    NULLIF(20, 10) result;
GO

-- Using NULLIF expression with character string data example
SELECT 
    NULLIF('Hello', 'Hello') result;
GO
SELECT 
    NULLIF('Hello', 'Hi') result;
GO
-- Using NULLIF expression to translate a blank string to NULL
CREATE TABLE sales.leads
(
    lead_id    INT	PRIMARY KEY IDENTITY, 
    first_name VARCHAR(100) NOT NULL, 
    last_name  VARCHAR(100) NOT NULL, 
    phone      VARCHAR(20), 
    email      VARCHAR(255) NOT NULL
);
GO
INSERT INTO sales.leads
(
    first_name, 
    last_name, 
    phone, 
    email
)
VALUES
(
    'John', 
    'Doe', 
    '(408)-987-2345', 
    'john.doe@example.com'
),
(
    'Jane', 
    'Doe', 
    '', 
    'jane.doe@example.com'
),
(
    'David', 
    'Doe', 
    NULL, 
    'david.doe@example.com'
);
GO
SELECT 
    lead_id, 
    first_name, 
    last_name, 
    phone, 
    email
FROM 
    sales.leads
ORDER BY
    lead_id;
GO
SELECT    
    lead_id, 
    first_name, 
    last_name, 
    phone, 
    email
FROM    
    sales.leads
WHERE 
    phone IS NULL;
GO
/*
The output missed one row which has the empty string in the phone column. To fix this you can use the NULLIF expression:
*/
SELECT    
    lead_id, 
    first_name, 
    last_name, 
    phone, 
    email
FROM    
    sales.leads
WHERE 
    NULLIF(phone,'') IS NULL;
GO
-- NULLIF and CASE expression
/*
This expression that uses NULLIF:

SELECT 
    NULLIF(a,b)
Code language: SQL (Structured Query Language) (sql)
is equivalent to the following expression that uses the CASE expression:

CASE 
    WHEN a=b THEN NULL 
    ELSE a 
END
*/
GO
DECLARE @a int = 10, @b int = 20;
SELECT
    NULLIF(@a,@b) AS result;
GO
DECLARE @a int = 10, @b int = 20;
SELECT
    CASE
        WHEN @a = @b THEN null
        ELSE 
            @a
    END AS result;
GO














