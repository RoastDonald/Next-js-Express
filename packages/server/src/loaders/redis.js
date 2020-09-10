import session from "express-session";
import config from "../config/index";
import connectRedis from "connect-redis";
import Redis from "ioredis";

export default (app) => {
  const RedisStore = connectRedis(session);
  app.use(
    session({
      name: config.credentials.COOKIE_NAME,
      store: new RedisStore({
        client: new Redis(),
        disableTouch: true,
        port: 6379,
        host: "localhost",
      }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      secret: config.credentials.COOKIE_SECRET,
      resave: false,
      rolling: true,
    })
  );
};
