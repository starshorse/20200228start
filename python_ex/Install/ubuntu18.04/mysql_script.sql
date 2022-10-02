SHOW VARIABLES LIKE '%version%';  
USE mysql;
SELECT User, Host, plugin FROM mysql.user;
update user set plugin='mysql_navtive_password' where user='root';
commit ;
flush privileges;
select user , host, plugin from user; 
exit;
