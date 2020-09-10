import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  api: {
    prefix: "/api",
  },
  logs: {
    level: 0,
  },
  databases: {
    mongodb: {
      connectionURL: process.env.MONGODB_URI,
    },
  },
  serverPORT: process.env.SERVER_PORT,
  credentials: {
    COOKIE_NAME: process.env.COOKIE_NAME,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
  },
};
