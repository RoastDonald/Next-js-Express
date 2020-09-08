import { Router } from "express";
import user from "./routes/user";
import shop from "./routes/shop";

export default () => {
  const app = Router();
  user(app);
  shop(app);
  return app;
};
