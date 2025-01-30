Select n random rows from SQL Server table
===========================================
I've got a SQL Server table with about 50,000 rows in it. I want to select about 5,000 of those rows at random. I've thought of a complicated way, creating a temp table with a "random number" column, copying my table into that, looping through the temp table and updating each row with RAND(), and then selecting from that table where the random number column < 0.1. I'm looking for a simpler way to do it, in a single statement if possible.

This article suggest using the NEWID() function. That looks promising, but I can't see how I could reliably select a certain percentage of rows.

Anybody ever do this before? Any ideas?

Highest score (default)
470

select top 10 percent * from [yourtable] order by newid()
In response to the "pure trash" comment concerning large tables: you could do it like this to improve performance.

select  * from [yourtable] where [yourPk] in 
(select top 10 percent [yourPk] from [yourtable] order by newid())
The cost of this will be the key scan of values plus the join cost, which on a large table with a small percentage selection should be reasonable.

Adding an identity value with SELECT INTO
=========================================
Category : Tips		User Rating : 4.5 Stars      Views : 4.5 Stars	Send an email to alert someone to this pagePrint this page
When copying data into a new table using SELECT INTO it can be useful to add an identity column at the same time, especially where the source data does not already have a primary key.

To do this we can just define an identity column in the select into statement.

At its simplest this could be a statement like :
SELECT IDENTITY(INT,1,1) AS ID,*
INTO NewTable FROM ExistingTable
For a more specific example if we have a table called ExistingTable which contains two columns :

Existing Table
If we run the following code it will create a table with the data shown below :
SELECT IDENTITY(INT,1,1) AS ID, FirstName,Surname
INTO NewTable FROM ExistingTable

Existing Table


  select top 1 percent IDENTITY(INT,1,1) as seq, [name],[avatar],[city], [RegDate],[UpdateDate] into [demo].[dbo].[TB_employees] from  [demo].[dbo].[TB_customers] order by newId() 




  select A.seq, A.OrderDate ,  B.name as customer, C.name as employee , A.OrderTotal  from [demo].[dbo].[TB_orders] A
																			left join [demo].[dbo].[TB_customers] B on A.CustomerID = B.seq
																			left join [demo].[dbo].[TB_employees] C on A.EmployeeID = C.seq   order by A.seq
