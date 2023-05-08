--SQL Server Views
CREATE VIEW sales.product_info
AS
SELECT
    product_name, 
    brand_name, 
    list_price
FROM
    "production.products" p
INNER JOIN "production.brands" b 
        ON b.brand_id = p.brand_id;
GO
SELECT * FROM sales.product_info;
GO
CREATE VIEW sales.daily_sales
AS
SELECT
    year(order_date) AS y,
    month(order_date) AS m,
    day(order_date) AS d,
    p.product_id,
    product_name,
    quantity * i.list_price AS sales
FROM
    "sales.orders" AS o
INNER JOIN "sales.order_items" AS i
    ON o.order_id = i.order_id
INNER JOIN "production.products" AS p
    ON p.product_id = i.product_id;
GO
SELECT 
    * 
FROM 
    sales.daily_sales
ORDER BY
    y, m, d, product_name;

-- Redefining the view example

GO
CREATE OR ALTER VIEW sales.daily_sales (
    year,
    month,
    day,
    customer_name,
    product_id,
    product_name,
    sales
)
AS
SELECT
    year(order_date),
    month(order_date),
    day(order_date),
    concat(
        first_name,
        ' ',
        last_name
    ),
    p.product_id,
    product_name,
    quantity * i.list_price
FROM
    "sales.orders" AS o
    INNER JOIN
        "sales.order_items" AS i
    ON o.order_id = i.order_id
    INNER JOIN
        "production.products" AS p
    ON p.product_id = i.product_id
    INNER JOIN "sales.customers" AS c
    ON c.customer_id = o.customer_id;

GO
SELECT 
    * 
FROM 
    sales.daily_sales
ORDER BY 
    year, 
    month, 
    day, 
    customer_name;

GO
-- Creating a view using aggregate functions example
CREATE VIEW sales.staff_sales (
        first_name, 
        last_name,
        year, 
        amount
)
AS 
    SELECT 
        first_name,
        last_name,
        YEAR(order_date),
        SUM(list_price * quantity) amount
    FROM
        "sales.order_items" i
    INNER JOIN "sales.orders" o
        ON i.order_id = o.order_id
    INNER JOIN "sales.staffs" s
        ON s.staff_id = o.staff_id
    GROUP BY 
        first_name, 
        last_name, 
        YEAR(order_date);
GO
SELECT  
    * 
FROM 
    sales.staff_sales
ORDER BY 
	first_name,
	last_name,
	year;









