-- SQL Server ALTER TABLE ADD Column

-- SQL Server ALTER TABLE ADD column examples

CREATE TABLE sales.quotations (
    quotation_no INT IDENTITY PRIMARY KEY,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL
);
GO
ALTER TABLE sales.quotations 
ADD description VARCHAR (255) NOT NULL;

GO
ALTER TABLE sales.quotations 
    ADD 
        amount DECIMAL (10, 2) NOT NULL,
        customer_name VARCHAR (50) NOT NULL;
GO


