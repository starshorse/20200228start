-- SQL Server NOT NULL Constraint
CREATE SCHEMA hr;
GO

CREATE TABLE hr.persons(
    person_id INT IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20)
);
GO
-- Add NOT NULL constraint to an existing column
select * from hr.persons

UPDATE hr.persons
SET phone = '(408) 123 4567'
WHERE phone IS NULL;

ALTER TABLE hr.persons
ALTER COLUMN phone VARCHAR(20) NOT NULL;

-- Removing NOT NULL constraint
ALTER TABLE hr.persons
ALTER COLUMN phone VARCHAR(20) NULL;




