-- SQL Server UNIQUE Constraint

DROP TABLE hr.persons;
CREATE TABLE hr.persons(
    person_id INT IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    UNIQUE(email)
);
GO
INSERT INTO hr.persons(first_name, last_name, email)
VALUES('John','Doe','j.doe@bike.stores');
GO
INSERT INTO hr.persons(first_name, last_name, email)
VALUES('Jane','Doe','j.doe@bike.stores');
GO
DROP TABLE hr.persons;
-- To assign a particular name to a UNIQUE constraint, you use the CONSTRAINT keyword as follows:
CREATE TABLE hr.persons (
    person_id INT IDENTITY PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    CONSTRAINT unique_email UNIQUE(email)
);
GO
-- UNIQUE constraint vs. PRIMARY KEY constraint

INSERT INTO hr.persons(first_name, last_name)
VALUES('John','Smith');
-- Now, if you try to insert one more NULL into the email column, you will get an error:
INSERT INTO hr.persons(first_name, last_name)
VALUES('Lily','Bush');

-- UNIQUE constraints for a group of columns


CREATE TABLE hr.person_skills (
    id INT IDENTITY PRIMARY KEY,
    person_id int,
    skill_id int,
    updated_at DATETIME,
    UNIQUE (person_id, skill_id)
);

-- Add UNIQUE constraints to existing columns
ALTER TABLE hr.persons
DROP CONSTRAINT unique_email

ALTER TABLE hr.persons
ADD CONSTRAINT unique_email UNIQUE(email);


ALTER TABLE hr.persons
ADD phone VARCHAR(30) 

ALTER TABLE hr.persons
ADD CONSTRAINT unique_phone UNIQUE(phone); 

ALTER TABLE hr.persons
DROP CONSTRAINT unique_phone;














