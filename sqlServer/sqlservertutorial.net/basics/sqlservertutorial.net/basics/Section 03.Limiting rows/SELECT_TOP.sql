-- 1) Using TOP with a constant value
SELECT TOP 10
    product_name, 
    list_price
FROM
    "production.products"
ORDER BY 
    list_price DESC;
GO
-- 2) Using TOP to return a percentage of rows
SELECT TOP 1 PERCENT
    product_name, 
    list_price
FROM
    "production.products"
ORDER BY 
    list_price DESC;
GO
-- 3) Using TOP WITH TIES to include rows that match the values in the last row
SELECT TOP 3 WITH TIES
    product_name, 
    list_price
FROM
    "production.products"
ORDER BY 
    list_price DESC;
GO