-- SQL Server DATETIMEOFFSET

-- DATETIMEOFFSET syntax
-- Literal formats
/*
YYYY-MM-DDThh:mm:ss[.nnnnnnn][{+|-}hh:mm]
*/
-- DATETIMEOFFSET examples

CREATE TABLE messages(
    id         INT PRIMARY KEY IDENTITY, 
    message    VARCHAR(255) NOT NULL, 
    created_at DATETIMEOFFSET NOT NULL
);

INSERT INTO messages(message,created_at)
VALUES('DATETIMEOFFSET demo',
        CAST('2019-02-28 01:45:00.0000000 -08:00' AS DATETIMEOFFSET));
GO
select id, message, created_at AS 'Pacific Standard Time' ,created_at AT TIME ZONE 'SE Asia Standard Time' 
        AS 'SE Asia Standard Time' from messages

SELECT 
    id, 
    message, 
	created_at AS 'Pacific Standard Time',
    created_at AT TIME ZONE 'SE Asia Standard Time' AS 'SE Asia Standard Time'
FROM 
    messages;
