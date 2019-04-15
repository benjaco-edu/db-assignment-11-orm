# DB Assignment 11 orm

https://github.com/datsoftlyngby/soft2019spring-databases/blob/master/assignments/assignment11.md

## Project

The project is written in typescript, and the produced orm files is typescript as well.

### Structure

#### src/generateClass.ts
Reads the def file and generate files

#### src/orm
Fetches the data based on the query

### Bonus
I included some extra features:

- The returned classes can get related objects and related lists using an async method directly on the object
- You can put in where selection on every part of the query, not just the first ex: `(Order|total > 200 or date = '14 april 19').(Customer|name LIKE 'J%')`

## Get up and running

We need a couple of things here:

### Start up a database
```
sudo docker run --name my_mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=pass1234 -d mysql
sudo docker exec my_mysql apt-get update
sudo docker exec my_mysql apt-get -y install wget # bad practice, but it is going to make your life easier
```
### Generate the sql file
```
sudo docker run --name orm --link my_mysql:database_server -d bslcphbussiness/db-assignment-11-orm sleep 10000
sudo docker exec orm ts-node src/generateClass.ts classdef.json
```
### Lets take a look at the generated files
```
sudo docker exec orm cat database.sql
sudo docker exec orm cat orm.ts
```
### Move it over to the database
```
sudo docker cp orm:database.sql .
sudo docker cp database.sql my_mysql:/
```
### Import it into the database and throw in some dummy data as well as a new user

Before you run the next part, give it half a minute if you have rushed to here, the database might not be ready.

```
sudo docker exec my_mysql mysql -u root -ppass1234 -e "source database.sql"
sudo docker exec my_mysql wget https://raw.githubusercontent.com/benjaco-edu/db-assignment-11-orm/master/sqlscripts/insert_data.sql
sudo docker exec my_mysql mysql -u root -ppass1234  MicroShop -e "source insert_data.sql"
sudo docker exec my_mysql wget https://raw.githubusercontent.com/benjaco-edu/db-assignment-11-orm/master/sqlscripts/sqlusers.sql
sudo docker exec my_mysql mysql -u root -ppass1234  MicroShop -e "source sqlusers.sql"
```
### Run the orm code
```
sudo docker exec orm ts-node src/useOrm.ts
```

### Clean up
```
sudo docker rm -f orm
sudo docker rm -f my_mysql
```

## Run it without docker:

To run the code, you have to have node install, and then typescript installed "npm install -g typescript", "npm install -g ts-node"

Generate orm files: `ts-node src/generateClass.ts classdef.json`

Run it: `ts-node src/useOrm.ts`