import express from "express";
import cors from "cors";
import helment from "helmet";
import config from "../config/index";
import routes from "../api/index";

export default (app) => {
  app.get("/status", () => {
    res.status(200).json({
      status: "OK",
    });
  });

  app.use(cors());
  app.use(helment());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error("not found");
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
      success: false,
      errors: err.message,
    });
  });
};
