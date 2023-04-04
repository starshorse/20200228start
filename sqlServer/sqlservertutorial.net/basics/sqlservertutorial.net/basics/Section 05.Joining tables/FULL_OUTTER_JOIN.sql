-- # SQL Server Full Outter Join
-- Introduction to SQL Server RIGHT JOIN clause
-- SQL Server Full Outter JOIN example

-- SQL Server full outer join example
CREATE SCHEMA pm;
GO
CREATE TABLE pm.projects(
    id INT PRIMARY KEY IDENTITY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE pm.members(
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(120) NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) 
        REFERENCES pm.projects(id)
);
GO
INSERT INTO 
    pm.projects(title)
VALUES
    ('New CRM for Project Sales'),
    ('ERP Implementation'),
    ('Develop Mobile Sales Platform');


INSERT INTO
    pm.members(name, project_id)
VALUES
    ('John Doe', 1),
    ('Lily Bush', 1),
    ('Jane Doe', 2),
    ('Jack Daniel', null);
GO
SELECT * FROM pm.projects;
SELECT * FROM pm.members;
GO
SELECT 
    m.name member, 
    p.title project
FROM 
    pm.members m
    FULL OUTER JOIN pm.projects p 
        ON p.id = m.project_id;
GO
SELECT 
    m.name member, 
    p.title project
FROM 
    pm.members m
    FULL OUTER JOIN pm.projects p 
        ON p.id = m.project_id
WHERE
    m.id IS NULL OR
    P.id IS NULL;
GO
