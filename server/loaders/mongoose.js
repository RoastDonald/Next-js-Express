import mongoose from "mongoose";
import config from "../config/index";
import logger from "./logger";

export default async () => {
  const conn = await mongoose.connect(config.databases.mongodb.connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  conn.connection.on("connected", () => {
    logger.info("db connected");
  });

  conn.connection.on("disconnect", () => {
    logger.info("db disconnected");
  });

  return conn.connection.db;
};
