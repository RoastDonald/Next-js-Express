import loaders from "./loaders/index";
import config from "./config/index";
import express from "express";
const main = () => {
  const app = express();
  loaders(app);
  app.listen(config.serverPORT, () => {
    console.log(`Server Running at ${config.serverPORT}`);
  });
};

main();
