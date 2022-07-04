SQL SEVER 2012
===============

```
 CREATE TABLE 'my techTBL' ( id INT )
 DROP TABLE [my techTBL]
 USE shopDB 

 SELECT Name, ProductNumber, ListPrice, Size  INTO indexTBL FROM AdventureWorks`.Production.Product ;
 GO
 SELECT * FROM indexTBL;

 SELECT * FROM indexTBL WHERE Name = 'Minipump';
 ```
####
```
 CREATE INDEX idx_indexTBL_Name ON indexTBL( Name ) ;
 CREATE VIEW  uv_memberTBL
 AS 
 SELECT memberName, memberAddress FROM memberTBL 
```
