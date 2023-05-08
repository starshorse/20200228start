-- SQL Server DATE

-- SQL   Server DATE examples
SELECT    
	order_id, 
	customer_id, 
	order_status, 
	order_date
FROM    
	"sales.orders"
WHERE order_date < '2016-01-05'
ORDER BY 
	order_date DESC;
GO
-- B) Using DATE to define the table columns example
CREATE TABLE sales.list_prices (
    product_id INT NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    amount DEC (10, 2) NOT NULL,
    PRIMARY KEY (
        product_id,
        valid_from,
        valid_to
    ),
    FOREIGN KEY (product_id) 
      REFERENCES "production.products" (product_id)
);
GO
INSERT INTO sales.list_prices (
    product_id,
    valid_from,
    valid_to,
    amount
)
VALUES
    (
        1,
        '2019-01-01',
        '2019-12-31',
        400
    );

GO
Select * from sales.list_prices



