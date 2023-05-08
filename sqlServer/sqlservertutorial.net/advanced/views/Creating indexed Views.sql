-- SQL Server Indexed View 
-- Creating an SQL Server indexed view example
CREATE TABLE production.categories (
	category_id INT IDENTITY (1, 1) PRIMARY KEY,
	category_name VARCHAR (255) NOT NULL
);
GO
CREATE TABLE production.brands (
	brand_id INT IDENTITY (1, 1) PRIMARY KEY,
	brand_name VARCHAR (255) NOT NULL
);
GO
CREATE TABLE production.products (
	product_id INT IDENTITY (1, 1) PRIMARY KEY,
	product_name VARCHAR (255) NOT NULL,
	brand_id INT NOT NULL,
	category_id INT NOT NULL,
	model_year SMALLINT NOT NULL,
	list_price DECIMAL (10, 2) NOT NULL,
/*
	FOREIGN KEY (category_id) 
        REFERENCES production.categories (category_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
*/
	FOREIGN KEY (brand_id) 
        REFERENCES production.brands (brand_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
GO
-- Notice the option WITH SCHEMABINDING after the view name. The rest is the same as a regular view.
CREATE VIEW production.product_master
WITH SCHEMABINDING
AS 
SELECT
    product_id,
    product_name,
    model_year,
    list_price,
    brand_name,
    category_name
FROM
    production.products p
INNER JOIN production.brands b 
    ON b.brand_id = p.brand_id
INNER JOIN production.categories c 
    ON c.category_id = p.category_id;

GO
SET STATISTICS IO ON
GO

SELECT 
    * 
FROM
    production.product_master
ORDER BY
    product_name;
GO 
-- Let¡¯s add a unique clustered index to the view:
CREATE UNIQUE CLUSTERED INDEX 
    ucidx_product_id 
ON production.product_master(product_id);
GO
CREATE NONCLUSTERED INDEX 
    ucidx_product_name
ON production.product_master(product_name);
GO
SELECT * 
FROM production.product_master 
   WITH (NOEXPAND)
ORDER BY product_name;




