"use strict";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "redis";
import mysql from "mysql2/promise";

dotenv.config();
// environment variables
const expressPort = process.env.PORT || 5001;
const sqlTable = 'tasks';
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tododb'
};

// redis
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || "";
const redisChannel = process.env.REDIS_CHANNEL || "";

// configs
const redisUrl = `redis://${redisHost}:${redisPort}`;

const redisClient = createClient({ url: 'redis://localhost:6379' });

const getData = async () => {
  const sqlQuery = `SELECT * FROM ${sqlTable}`;
  const sqlConnection = await mysql.createConnection(dbConfig);
  return sqlConnection.execute(sqlQuery);
};

const setRedisCache = async (jsonData) => {
  const value = JSON.stringify({ isCached: "yes", data: jsonData });
  await redisClient.connect();
  await redisClient.set("task", value);
  return redisClient.disconnect();
};

const getRedisCache = async () => {
  await redisClient.connect();
  const cachedData = await redisClient.get("task");
  await redisClient.disconnect();
  return cachedData;
};

const deleteRedisCache = async () => {
  await redisClient.connect();
  await redisClient.del("task");
  return redisClient.disconnect();
};

const publishToRedis = async (data) => {
    console.log(data);
    await redisClient.connect();
    const subscriberCount = await redisClient.publish('taskChannel',data);
    await redisClient.disconnect();
    return subscriberCount;
  };

  //express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => res.status(200).send("Hello World!"));

app.get("/data", async (_, res) => {
  try {
    const cachedData = await getRedisCache();
    if (cachedData) {
      const results = JSON.parse(cachedData);
      res.status(200).json({ message: "success", ...results });
      // ending the fn
      return;
    }

    const [data, _] = await getData();
    await setRedisCache(data);

    res.status(200).json({ message: "success", isCached: "no", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "failure", error });
  }
});

app.post("/create", async (req, res) => {
    const data  = req.body;
    
    try {
      //if (!data) throw new Error("missing data");
      const subscriberCount = await publishToRedis(JSON.stringify(data));
      console.log({ subscriberCount });
      const test = await deleteRedisCache();
      res.status(200).json({ message: "success" });
    } catch (error) {
      console.log({ error });
      res.status(500).json({ message: "failure", error });
    }
  });

  
app.listen(expressPort, () => console.log(`served on port ${expressPort}`));
  