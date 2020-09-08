import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  api: {
    prefix: "/api",
  },
  databases: {
    mongodb: {
      connectionURL: process.env.MONGODB_URI,
    },
  },
  serverPORT: process.env.PORT,
  credentials: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
