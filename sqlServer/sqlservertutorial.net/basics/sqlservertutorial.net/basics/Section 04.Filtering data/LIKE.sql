-- LIKE
-- The % (percent) wildcard examples
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE 'z%'
ORDER BY
    first_name;
GO
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE '%er'
ORDER BY
    first_name;
GO
-- The following statement retrieves the customers whose last name starts with the letter t and ends with the letter s:
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE 't%s'
ORDER BY
    first_name;
GO
-- The _ (underscore) wildcard example
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE '_u%'
ORDER BY
    first_name; 
GO
-- The [list of characters] wildcard example
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE '[YZ]%'
ORDER BY
    last_name;
GO
-- The [character-character] wildcard example
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE '[A-C]%'
ORDER BY
    first_name;
GO
-- The [^Character List or Range] wildcard example »©°í .. 
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    last_name LIKE '[^A-X]%'
ORDER BY
    last_name;
GO
-- The NOT LIKE operator example
SELECT
    customer_id,
    first_name,
    last_name
FROM
    "sales.customers"
WHERE
    first_name NOT LIKE 'A%'
ORDER BY
    first_name;
GO
-- SQL Server LIKE with ESCAPE example
CREATE TABLE sales.feedbacks (
   feedback_id INT IDENTITY(1, 1) PRIMARY KEY, 
    comment     VARCHAR(255) NOT NULL
);
GO
INSERT INTO sales.feedbacks(comment)
VALUES('Can you give me 30% discount?'),
      ('May I get me 30USD off?'),
      ('Is this having 20% discount today?');
GO
SELECT * FROM sales.feedbacks;
GO
-- If you want to search for 30% in the comment column, you may come up with a query like this:
SELECT 
   feedback_id,
   comment
FROM 
   sales.feedbacks
WHERE 
   comment LIKE '%30%';
GO
SELECT 
   feedback_id, 
   comment
FROM 
   sales.feedbacks
WHERE 
   comment LIKE '%30!%%' ESCAPE '!';




