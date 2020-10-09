import mongoose from "mongoose";
import config from "../config";
import logger from "../loaders/logger";

const {
  connectionURL,
  config: dbconfig
} = config.databases.mongodb;
export default async () => {
  try {
    const conn = await mongoose.connect(connectionURL, dbconfig);
    return conn.connection.db;
  } catch (error) {

    logger.error(error);
    return null;
  }
};