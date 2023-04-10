-- SQL Server ANY
-- SQL Server ANY operator example
use BikeStores

SELECT
    product_name,
    list_price
FROM
    "production.products"
WHERE
    product_id = ANY (
        SELECT
            product_id
        FROM
            "sales.order_items"
        WHERE
            quantity >= 2
    )
ORDER BY
    product_name;

