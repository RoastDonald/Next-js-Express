import {
  Router
} from "express";
import user from "./routes/user";
import shop from "./routes/shop";
import file from './routes/file';
import admin from './routes/admin';


export default () => {
  const app = Router();
  user(app);
  shop(app);
  file(app);
  admin(app);
  return app;
};