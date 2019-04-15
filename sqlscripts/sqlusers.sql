use mysql;

CREATE USER 'nodejs'@'%' IDENTIFIED WITH mysql_native_password BY 'nodecode';
grant all privileges on MicroShop.* to 'nodejs'@'%';
FLUSH PRIVILEGES;