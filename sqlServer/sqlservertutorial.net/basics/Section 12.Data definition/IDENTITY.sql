-- SQL Server Identity
-- IDENTITY[(seed,increment)]
-- SQL Server IDENTITY example

CREATE SCHEMA hr;

CREATE TABLE hr.person (
    person_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender CHAR(1) NOT NULL
);

INSERT INTO hr.person(first_name, last_name, gender)
OUTPUT inserted.person_id
VALUES('John','Doe', 'M');

INSERT INTO hr.person(first_name, last_name, gender)
OUTPUT inserted.person_id
VALUES('Jane','Doe','F');

-- Reusing of identity values

CREATE TABLE hr. POSITION (
	position_id INT IDENTITY (1, 1) PRIMARY KEY,
	position_name VARCHAR (255) NOT NULL,

);
CREATE TABLE hr.person_position (
	person_id INT,
	position_id INT,
	PRIMARY KEY (person_id, position_id),
	FOREIGN KEY (person_id) REFERENCES hr.person (person_id),
	FOREIGN KEY (position_id) REFERENCES hr. POSITION (position_id)
);
BEGIN TRANSACTION
    BEGIN TRY
        -- insert a new person
        INSERT INTO hr.person(first_name,last_name, gender)
        VALUES('Joan','Smith','F');

        -- assign the person a position
        INSERT INTO hr.person_position(person_id, position_id)
        VALUES(@@IDENTITY, 1);
    END TRY
    BEGIN CATCH
         IF @@TRANCOUNT > 0  
            ROLLBACK TRANSACTION;  
    END CATCH

    IF @@TRANCOUNT > 0  
        COMMIT TRANSACTION;
GO
INSERT INTO hr.person(first_name,last_name,gender)
OUTPUT inserted.person_id
VALUES('Peter','Drucker','F');
GO
SELECT *
FROM hr.person

GO


