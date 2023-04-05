-- # SQL Server GROUPING SETS

/*
Setup a sales summary table
Let¡¯s create a new table named sales.sales_summary for the demonstration.
*/
SELECT
    b.brand_name AS brand,
    c.category_name AS category,
    p.model_year,
    round(
        SUM (
            quantity * i.list_price * (1 - discount)
        ),
        0
    ) sales INTO sales.sales_summary
FROM
    "sales.order_items" i
INNER JOIN "production.products" p ON p.product_id = i.product_id
INNER JOIN "production.brands" b ON b.brand_id = p.brand_id
INNER JOIN "production.categories" c ON c.category_id = p.category_id
GROUP BY
    b.brand_name,
    c.category_name,
    p.model_year
ORDER BY
    b.brand_name,
    c.category_name,
    p.model_year;
GO
SELECT
	*
FROM
	sales.sales_summary
ORDER BY
	brand,
	category,
	model_year;
GO
-- Getting started with SQL Server GROUPING SETS
SELECT
    brand,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    brand,
    category
ORDER BY
    brand,
    category;
GO
SELECT
    brand,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    brand
ORDER BY
    brand;
GO
-- The following query returns the sales amount by category. It defines a grouping set (category):
SELECT
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    category
ORDER BY
    category;
GO
-- The following query defines an empty grouping set (). It returns the sales amount for all brands and categories.
SELECT
    SUM (sales) sales
FROM
    sales.sales_summary;
GO
/*
To get a unified result set with the aggregated data for all grouping sets, you can use the UNION ALL operator.
Because UNION ALL operator requires all result set to have the same number of columns, 
you need to add NULL to the select list to the queries like this:
*/
SELECT
    brand,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    brand,
    category
UNION ALL
SELECT
    brand,
    NULL,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    brand
UNION ALL
SELECT
    NULL,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    category
UNION ALL
SELECT
    NULL,
    NULL,
    SUM (sales)
FROM
    sales.sales_summary
ORDER BY brand, category;
GO
/*
The query is quite lengthy.
The query is slow because SQL Server needs to execute four subqueries and combines the result sets into a single one.
To fix these problems, SQL Server provides a subclause of the GROUP BY clause called GROUPING SETS.
*/
SELECT
	brand,
	category,
	SUM (sales) sales
FROM
	sales.sales_summary
GROUP BY
	GROUPING SETS (
		(brand, category),
		(brand),
		(category),
		()
	)
ORDER BY
	brand,
	category;
GO
-- GROUPING function
SELECT
    GROUPING(brand) grouping_brand,
    GROUPING(category) grouping_category,
    brand,
    category,
    SUM (sales) sales
FROM
    sales.sales_summary
GROUP BY
    GROUPING SETS (
        (brand, category),
        (brand),
        (category),
        ()
    )
ORDER BY
    brand,
    category;
GO



