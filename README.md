# Todo App
This is a Todo app built using React, Express, MySQL, and Redis. It allows users to create and manage their tasks. The app follows a specific flow where a user creates a POST request to the Express API, which publishes the message to a Redis server. A worker server is responsible for processing the data and saving it to a MySQL database. Additionally, the app implements caching, where the first time a user retrieves data, it comes from the database, and subsequent requests fetch the data from the Redis cache.


# UI Screenshots

 - Add task


 - Publish to redis pub/sub channel - taskChannel & subscriber Subscribed


 - Worker server subsrcribed & saved into db


 - For the first time cache is empty, the data will retreve from db & cached


 - After clicking Refresh button data will retrieve from cache
 

 - After deleting cache will be empty & data retrieve from db



## Installation
To run the Todo app locally, please follow these steps:

## Prerequisites
- Docker and Docker Compose installed and running on your machine

## Steps
1. Clone this repository to your local machine.
```bash
    git clone https://github.com/linckon/todo-app-microservice-sample.git
```
2. Navigate to the project directory.

```bash
    cd todo-app-microservice-architecture
```
3. Follow the .env file for login MySql and Redis container

4. Run

```bash
    docker-compose up -d
```
5. To initiate table for the first time run below command

```bash
$ docker exec -it mysql-db bash
bash-4.4# mysql -u root -ppassword

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

mysql> create database tododb;
Query OK, 1 row affected (0.03 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| tododb             |
+--------------------+
5 rows in set (0.00 sec)

mysql> use tododb;
Database changed
mysql> create table tasks (id int not null auto_increment,name text,status text,primary key (id));
Query OK, 0 rows affected (0.07 sec)

mysql> show tables;
+------------------+
| Tables_in_tododb |
+------------------+
| tasks            |
+------------------+
1 row in set (0.00 sec)

mysql> insert into tasks (name,status) values ('learn networking','pending');
Query OK, 1 row affected (0.02 sec)

```

6. Access the Todo app in your browser at http://localhost:8080.

## Architecture
The Todo app is built using the following technologies and components:

- Frontend: The client-side of the app is developed using React.
- Backend: The server-side of the app is built with Express.
- Database: MySQL is used as the primary database for storing task information.
- Caching: Redis is used as a caching layer to improve performance and reduce database load.
- Worker Server: A separate worker server is responsible for processing data received from the Redis server and saving it to the MySQL database.

# API Endpoints
The Express API provides the following endpoints:

```bash

### Creates a new task and publishes it to the Redis server
POST http://localhost:5001/create
Content-Type: application/json

{
  "name": "task one",
  "status":"pending"
}


### get all tasks
GET http://localhost:5001/data

### delete task by given id
DELETE http://localhost:5001/delete/5

```

# Data Flow

![todo-app-architecture-diagram](https://github.com/linckon/todo-app-microservice-sample/assets/12873582/f47efced-bd56-4282-8779-6b68432c7bae)
 <p align="center">Dataflow Diagram</p> 
 
1. The user creates a new task by making a POST request to /tasks endpoint with the task details.
2. The Express server receives the request and publishes the task details to the Redis server.
3. The worker server, which is constantly listening to the Redis server, picks up the task details and processes them.
4. The worker server saves the task information to the MySQL database.
5. When a user requests task data, the server checks if it exists in the Redis cache.
- If the data exists in Redis, it is retrieved from there.
- If the data is not available in Redis, it is fetched from the MySQL database, and then cached in Redis for future requests.
