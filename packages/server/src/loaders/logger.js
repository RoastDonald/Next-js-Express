import winston, {
  format
} from "winston";
import config from "../config/index";

const {
  combine,
  timestamp,
  printf
} = format;
const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    info.message = Object.assign({
      message: info.message.message,
      stack: info.message.stack
    }, info.message);
  }

  if (info instanceof Error) {
    return Object.assign({
      message: info.message,
      stack: info.stack
    }, info);
  }

  return info;
});

const myFormat = printf(({
  level,
  message,
  timestamp,
}) => {
  return `${timestamp} ${level}: ${JSON.stringify(message,null,'\t')}`;
});

const transports = [];
if (!config.isProd) {
  transports.push(new winston.transports.Console({
    level: 'debug',
    format: format.combine(
      enumerateErrorFormat(),
      timestamp(),
      myFormat
    ),
  }));
} else {
  transports.push(
    new winston.transports.File({
      filename: "error.log",
      level: "error"
    })
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

  transports
});



export default logger;