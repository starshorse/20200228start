-- SQL Server ALTER SCHEMA

-- SQL Server ALTER SCHEMA overview
-- SQL Server ALTER SCHEMA example

CREATE TABLE dbo.offices
(
    office_id      INT
    PRIMARY KEY IDENTITY, 
    office_name    NVARCHAR(40) NOT NULL, 
    office_address NVARCHAR(255) NOT NULL, 
    phone          VARCHAR(20),
);
INSERT INTO 
    dbo.offices(office_name, office_address)
VALUES
    ('Silicon Valley','400 North 1st Street, San Jose, CA 95130'),
    ('Sacramento','1070 River Dr., Sacramento, CA 95820');
GO
CREATE PROC usp_get_office_by_id(
    @id INT
) AS
BEGIN
    SELECT 
        * 
    FROM 
        dbo.offices
    WHERE 
        office_id = @id;
END;
-- After that, transfer this dbo.offices table to the sales schema:
ALTER SCHEMA sales TRANSFER OBJECT::dbo.offices;  

EXEC usp_get_office_by_id @id =1

GO
ALTER PROC usp_get_office_by_id(
    @id INT
) AS
BEGIN
    SELECT 
        * 
    FROM 
        sales.offices
    WHERE 
        office_id = @id;
END;
EXEC usp_get_office_by_id @id = 1


