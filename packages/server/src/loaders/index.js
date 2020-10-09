import logger from "./logger";
import expressLoader from "./express";
import redisLoader from "./redis";
import mongooseLoader from "./mongoose";
import cloudinaryLoader from './cloudinary';


export default async (app) => {
  await mongooseLoader();
  logger.info("mongodb connected");

  await cloudinaryLoader();
  logger.info("cloudinary is configured");

  redisLoader(app);
  logger.info("redis connected");


  expressLoader(app);
  logger.info("express instantiated");
};