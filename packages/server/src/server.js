import loaders from "./loaders/index";
import config from "./config/index";
import express from "express";

const { serverPORT } = config;

const main = () => {
  const app = express();
  loaders(app);
  app.listen(serverPORT, () => {
    console.log(`Server Running at ${serverPORT}`);
  });
};

main();
