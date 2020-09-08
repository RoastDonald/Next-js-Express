import logger from "./logger";
import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async (app) => {
  const conn = await mongooseLoader();
  expressLoader(app);
  logger.info("express instantiated");
};
