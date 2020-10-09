import {
  Router
} from "express";
import user from "./routes/user";
import shop from "./routes/shop";
import file from './routes/file';


export default () => {
  const app = Router();
  user(app);
  shop(app);
  file(app);
  return app;
};