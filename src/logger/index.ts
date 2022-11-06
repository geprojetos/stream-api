import { createLogger, format, transports } from "winston";

const customFormat = {
  console: format.combine(
    format.colorize(),
    format.json(),
    format.printf(
      (info) => `[${info.level}] => ${JSON.stringify(info.message)}`
    )
  ),
  file: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => {
      return `{"date": "${info.timestamp}", "message": ${JSON.stringify(
        info.message
      )}`;
    })
  ),
};

const customTransport = {
  console: () => {
    return new transports.Console({
      format: customFormat.console,
    });
  },
  fileInfo: () => {
    return new transports.File({
      filename: "logs/info.log",
      level: "info",
      format: customFormat.file,
    });
  },
  fileError: () => {
    return new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: customFormat.file,
    });
  },
  fileCombined: () => {
    return new transports.File({
      filename: "logs/combined.log",
      format: customFormat.file,
    });
  },
};

const logger = createLogger({
  transports: [
    customTransport.console(),
    customTransport.fileInfo(),
    customTransport.fileError(),
    customTransport.fileCombined(),
  ],
});

export { logger };
