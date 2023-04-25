-- SQL Server Computed Columns

-- Introduction to SQL Server computed columns

CREATE TABLE persons
(
    person_id  INT PRIMARY KEY IDENTITY, 
    first_name NVARCHAR(100) NOT NULL, 
    last_name  NVARCHAR(100) NOT NULL, 
    dob        DATE
);
GO

INSERT INTO 
    persons(first_name, last_name, dob)
VALUES
    ('John','Doe','1990-05-01'),
    ('Jane','Doe','1995-03-01');
GO
/*
To query the full names of people in the persons table, you normally use the CONCAT() function or the + operator as follows:
*/
SELECT
    person_id,
    first_name + ' ' + last_name AS full_name,
    dob
FROM
    persons
ORDER BY
    full_name;
GO
ALTER TABLE persons
ADD full_name AS (first_name + ' ' + last_name);
GO
SELECT 
    person_id, 
    full_name, 
    dob
FROM 
    persons
ORDER BY 
    full_name;
GO
-- Persisted computed columns
ALTER TABLE persons
DROP COLUMN full_name;

GO
ALTER TABLE persons
ADD full_name AS (first_name + ' ' + last_name) PERSISTED;
GO
-- This formula returns the age in years based on the date of birth and today:
ALTER TABLE persons
ADD age_in_years 
    AS (CONVERT(INT,CONVERT(CHAR(8),GETDATE(),112))-CONVERT(CHAR(8),dob,112))/10000 
PERSISTED;
GO
ALTER TABLE persons
ADD age_in_years 
    AS (CONVERT(INT,CONVERT(CHAR(8),GETDATE(),112))-CONVERT(CHAR(8),dob,112))/10000;
GO
SELECT 
    person_id, 
    full_name, 
    age_in_years
FROM 
    persons
ORDER BY 
    age_in_years DESC;
























