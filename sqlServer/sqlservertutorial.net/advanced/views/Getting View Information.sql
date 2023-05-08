-- How to Get Information About a View in SQL Server
-- Getting the view information using the sql.sql_module catalog

SELECT
    definition,
    uses_ansi_nulls,
    uses_quoted_identifier,
    is_schema_bound
FROM
    sys.sql_modules
WHERE
    object_id
    = object_id(
            'sales.daily_sales'
        );

GO
-- Getting view information using the sp_helptext stored procedure

EXEC sp_helptext 'sales.product_list' ;
-- Getting the view information using OBJECT_DEFINITION() function
SELECT 
    OBJECT_DEFINITION(
        OBJECT_ID(
            'sales.staff_sales'
        )
    ) view_info;







