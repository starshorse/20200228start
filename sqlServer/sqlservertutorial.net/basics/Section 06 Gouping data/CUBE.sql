-- SQL Server CUBE

SELECT 
    brand, 
    SUM(sales)
FROM 
    sales.sales_summary
GROUP BY 
    brand;
GO
SELECT 
    SUM(sales)
FROM 
    sales.sales_summary;
GO
/*
The CUBE is a subclause of the GROUP BY clause that allows you to generate multiple grouping sets. The following illustrates the general syntax of the CUBE:
*/
-- SQL Server CUBE examples
SELECT
    brand,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    CUBE(brand, category);
GO
SELECT
    brand,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    brand,
    CUBE(category);
GO
