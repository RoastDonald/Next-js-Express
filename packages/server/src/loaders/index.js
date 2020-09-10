import logger from "./logger";
import expressLoader from "./express";
import redisLoader from "./redis";
import mongooseLoader from "./mongoose";

export default async (app) => {
  await mongooseLoader();
  logger.info("mongodb connected");
  redisLoader(app);
  logger.info("redis connected");
  expressLoader(app);
  logger.info("express instantiated");
};
