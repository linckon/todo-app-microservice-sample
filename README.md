# Todo App
This is a Todo app built using React, Express, MySQL, and Redis. It allows users to create and manage their tasks. The app follows a specific flow where a user creates a POST request to the Express API, which publishes the message to a Redis server. A worker server is responsible for processing the data and saving it to a MySQL database. Additionally, the app implements caching, where the first time a user retrieves data, it comes from the database, and subsequent requests fetch the data from the Redis cache.

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

- POST /tasks: Creates a new task and publishes it to the Redis server. 
- GET /tasks: Retrieves all tasks from the MySQL database.

# Data Flow
1. The user creates a new task by making a POST request to /tasks endpoint with the task details.
2. The Express server receives the request and publishes the task details to the Redis server.
3. The worker server, which is constantly listening to the Redis server, picks up the task details and processes them.
4. The worker server saves the task information to the MySQL database.
5. When a user requests task data, the server checks if it exists in the Redis cache.
- If the data exists in Redis, it is retrieved from there.
- If the data is not available in Redis, it is fetched from the MySQL database, and then cached in Redis for future requests.