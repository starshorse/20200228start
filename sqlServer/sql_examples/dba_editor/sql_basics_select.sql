SELECT
    first_name,
    last_name,
    email
FROM
    "sales.customers";

GO
SELECT
    *
FROM
    "sales.customers";
GO
SELECT
    *
FROM
    "sales.customers"
WHERE
    state = 'CA';

SELECT
    *
FROM
    "sales.customers"
WHERE
    state = 'CA'
ORDER BY
    first_name;

GO
SELECT
    city,
    COUNT (*)
FROM
    "sales.customers"
WHERE
    state = 'CA'
GROUP BY
    city
ORDER BY
    city;

GO
SELECT
    city,
    COUNT (*)
FROM
    "sales.customers"
WHERE
    state = 'CA'
GROUP BY
    city
HAVING
    COUNT (*) > 10
ORDER BY
    city;

