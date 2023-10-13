const winston = require("winston");

class Logger {
  constructor() {
    this.initLogger();
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  initLogger() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports: [
        this.getConsoleTransport(),
        ...this.getFileTransport(),
      ],
    });
  }

  getFileTransport() {
    return [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "info.log" }),
    ]
  }

  getConsoleTransport() {
    return new winston.transports.Console();
  }

  log(level, message) {
    this.logger.log({
      level,
      message,
    });
  }
}

module.exports = Logger.getInstance();