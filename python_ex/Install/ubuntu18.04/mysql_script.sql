SHOW VARIABLES LIKE '%version%';  
USE mysql;

delete from mysql.user where User='starshorse' ;
delete from mysql.db where User='starshorse' ;
drop database starshorse; 
flush privileges ;

create user starshorse ;
create user starshorse@localhost identified by '1234';
-- create user starshorse@'%';
grant all privileges on *.* to starshorse@'localhost';
flush privileges;
show grants for starshorse@localhost;
create database starshorse; 
SELECT User, Host, plugin FROM mysql.user;
select user , host, plugin from user; 
quit
