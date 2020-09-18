import dotenv from "dotenv";
dotenv.config();

const {
  SERVER_PORT,

  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,

  REDIS_PORT,
  REDIS_HOST,

  COOKIE_NAME,
  COOKIE_SECRET,
} = process.env;
const mongoUri = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

export default {
  api: {
    prefix: "/api",
  },
  logs: {
    level: 0,
  },
  databases: {
    mongodb: {
      connectionURL: mongoUri,
      config: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 10000,
        // authSource: "admin",
        user: MONGO_USERNAME,
        pass: MONGO_PASSWORD,
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
      },
    },
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  },
  serverPORT: SERVER_PORT || 8080,
  credentials: {
    cookieName: COOKIE_NAME,
    cookieSecret: COOKIE_SECRET,
  },
};
