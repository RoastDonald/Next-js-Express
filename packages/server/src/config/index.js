import dotenv from "dotenv";
dotenv.config();

const {
  SERVER_PORT,
  NODE_ENV,

  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,

  REDIS_PORT,
  REDIS_HOST,

  COOKIE_NAME,
  COOKIE_SECRET,

  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;
const mongoUri = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

export default {
  isProd: NODE_ENV === 'production',
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
  cloudinary: {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  }
};