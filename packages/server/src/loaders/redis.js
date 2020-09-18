import session from "express-session";
import config from "../config/index";
import connectRedis from "connect-redis";
import Redis from "ioredis";

const { cookieName, cookieSecret } = config.credentials;
const { port, host } = config.databases.redis;
export default (app) => {
  const RedisStore = connectRedis(session);
  app.use(
    session({
      name: cookieName,
      store: new RedisStore({
        client: new Redis(),
        disableTouch: true,
        port,
        host,
      }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      secret: cookieSecret,
      resave: false,
      rolling: true,
    })
  );
};
