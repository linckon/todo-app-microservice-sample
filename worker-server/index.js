"use strict";
import dotenv from "dotenv";
import { createClient } from "redis";
import mysql from "mysql2/promise";

dotenv.config();

//const redisUrl = createClient({ url: 'redis://localhost:6379' });

const sqlTable = 'tasks';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tododb'
  };
  
  // helper fn for DB
  const createData = async (data) => {
    const obj = JSON.parse(data);
    console.log(`${obj.name} ${obj.status}`)
    const sqlQuery = `INSERT INTO ${sqlTable} (name,status) VALUES ('${obj.name}','${obj.status}')`;
    const sqlConnection = await mysql.createConnection(dbConfig);
    return sqlConnection.execute(sqlQuery);
  };

  (function () {
    const subscriber = createClient({ url: 'redis://localhost:6379' });
    subscriber.connect();
  
    // redis status logger
    subscriber.on("error", (err) => console.log("Redis error", err));
    subscriber.on("connect", () => console.log("\n Connected to Redis \n"));
    subscriber.on("reconnecting", () => {
      console.log("\nReconnecting to Redis.\n");
    });
    subscriber.on("ready", () => {
      console.log("\n Redis ready for action! \n");
      // call back fn is required
      subscriber.subscribe('taskChannel', async (message) => {
        console.log("subscriber service:- ", message);
        try {
          await createData(message);
        } catch (error) {
          console.log({ error });
        }
      });
    });
  })();