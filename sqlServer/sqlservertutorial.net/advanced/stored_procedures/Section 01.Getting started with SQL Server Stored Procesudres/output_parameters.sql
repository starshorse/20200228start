-- Stored Procedure Output Parameters

-- Creating output parameters
ALTER PROCEDURE uspFindProductByModel (
    @model_year SMALLINT,
    @product_count INT OUTPUT
) AS
BEGIN
    SELECT 
        product_name,
        list_price
    FROM
        "production.products"
    WHERE
        model_year = @model_year;

    SELECT @product_count = @@ROWCOUNT;
END;
GO
-- Calling stored procedures with output parameters
DECLARE @count INT;

EXEC uspFindProductByModel
    @model_year = 2018,
    @product_count = @count OUTPUT;

SELECT @count AS 'Number of products found';

