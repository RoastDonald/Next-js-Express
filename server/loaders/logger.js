import winston from "winston";

const transports = [];
if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.File({ filename: "error.log", level: "error" })
  );
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
}

const logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export default logger;
