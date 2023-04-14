-- SQL Server INSERT

-- SQL Server INSERT statement examples
CREATE TABLE sales.promotions (
    promotion_id INT PRIMARY KEY IDENTITY (1, 1),
    promotion_name VARCHAR (255) NOT NULL,
    discount NUMERIC (3, 2) DEFAULT 0,
    start_date DATE NOT NULL,
    expired_date DATE NOT NULL
); 
GO 
-- 1) Basic INSERT example
INSERT INTO sales.promotions (
    promotion_name,
    discount,
    start_date,
    expired_date
)
VALUES
    (
        '2018 Summer Promotion',
        0.15,
        '20180601',
        '20180901'
    );
GO
SELECT
    *
FROM
    sales.promotions;

--2) Insert and return inserted values
Go
INSERT INTO sales.promotions (
    promotion_name,
    discount,
    start_date,
    expired_date
) OUTPUT inserted.promotion_id
VALUES
    (
        '2018 Fall Promotion',
        0.15,
        '20181001',
        '20181101'
    );
/*
To capture inserted values from multiple columns, you specify the columns in the output as shown in the following statement:
*/
GO
INSERT INTO sales.promotions (
    promotion_name,
    discount,
    start_date,
    expired_date
) OUTPUT inserted.promotion_id,
 inserted.promotion_name,
 inserted.discount,
 inserted.start_date,
 inserted.expired_date
VALUES
    (
        '2018 Winter Promotion',
        0.2,
        '20181201',
        '20190101'
    );
GO
INSERT INTO sales.promotions (
    promotion_id,
    promotion_name,
    discount,
    start_date,
    expired_date
) OUTPUT inserted.promotion_id
VALUES
    (
        4,
        '2019 Spring Promotion',
        0.25,
        '20190201',
        '20190301'
    );
GO
SET IDENTITY_INSERT sales.promotions ON;

INSERT INTO sales.promotions (
    promotion_id,
    promotion_name,
    discount,
    start_date,
    expired_date
)
VALUES
    (
        4,
        '2019 Spring Promotion',
        0.25,
        '20190201',
        '20190301'
    );


SET IDENTITY_INSERT sales.promotions OFF;
GO
SELECT * FROM sales.promotions;



















