-- SQL Server Unique Index
--SQL Server unique index overview

-- SQL Server unique index examples
-- A) Creating a SQL Server unique index for one column example

SELECT
    customer_id, 
    email 
FROM
    "sales.customers"
WHERE 
    email = 'caren.stephens@msn.com';

GO
-- 중복되는 것이 없는 것을 확인 .. 
SELECT 
    email, 
    COUNT(email)
FROM 
    "sales.customers"
GROUP BY 
    email
HAVING 
    COUNT(email) > 1;
GO
CREATE UNIQUE INDEX ix_cust_email 
ON "sales.customers"(email);

-- B) Creating a SQL Server unique index for multiple columns example
CREATE TABLE t1 (
    a INT, 
    b INT
);
GO
alter table t1 drop constraint  PK__t1__3213E83F2F79E3AC  
delete from  t1
CREATE UNIQUE INDEX ix_uniq_ab
ON t1(a, b);

INSERT INTO t1(a,b) VALUES(1,2);
-- SQL Server unique index and NULL

CREATE UNIQUE INDEX a_uniq_t2
ON t2(c);

-- Unique index vs. UNIQUE constraint











