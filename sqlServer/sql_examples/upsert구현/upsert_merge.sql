--Generate Table #1
CREATE TABLE #Employees (EmployeeID int not null, EmployeeName varchar(50) not null, UpdatedDateTime datetime not null, Method varchar(50) not null)
INSERT INTO #Employees (EmployeeID, EmployeeName, UpdatedDateTime, Method)
VALUES 
(1,'John Doe', GetDate(), 'Insert')
,(2,'Johny Neutron',GetDate(),'Insert')
,(3,'Lucas Skywalker',GetDate(),'Insert')
,(4,'Shaggy',GetDate(),'Insert')
,(5,'Elton Musk',GetDate(),'Insert')

GO

select * from #Employees

GO 
-- UPSERT First Example 
MERGE #EMPLOYEES AS [Target]
USING (SELECT EmployeeID = 59, EmployeeName= 'Bill Gates') AS [Source] 
    ON [Target].EmployeeID = [Source].EmployeeID --- specifies the condition
WHEN MATCHED THEN
  UPDATE SET [Target].Method='Update', [Target].UpdatedDateTime = GetDate() --UPDATE STATEMENT
WHEN NOT MATCHED THEN
  INSERT (EmployeeID, EmployeeName,Method,UpdatedDateTime) VALUES ([Source].EmployeeID,[Source].EmployeeName, 'Insert', GetDate()); --INSERT STATEMENT

GO
-- UPSERT Sec Example 

 MERGE #EMPLOYEES AS [Target]
USING (SELECT EmployeeID = 5, EmployeeName= 'Elon Musk') AS [Source] 
    ON [Target].EmployeeID = [Source].EmployeeID --- specifies the condition
WHEN MATCHED THEN
  UPDATE SET [Target].EmployeeName = [Source].EmployeeName ,[Target].Method='Update', [Target].UpdatedDateTime = GetDate() --UPDATE STATEMENT
WHEN NOT MATCHED THEN
  INSERT (EmployeeID, EmployeeName,Method,UpdatedDateTime) VALUES ([Source].EmployeeID,[Source].EmployeeName, 'Insert', GetDate()); --INSERT STATEMENT

GO

