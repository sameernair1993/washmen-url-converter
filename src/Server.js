const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const hpp = require("hpp");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("./logger/Logger");
const router = require("./router");
const swaggerOptions = require("./config/swagger");
const Database = require("./database/Database");


class Server {
  get application() {
    return this.app;
  }

  constructor(config) {
    this.app = express();
    this.config = config;
  }

  async init() {
    this.initHpp();
    this.initCompression();
    this.initHelmet();
    this.initCors();
    this.initJsonParser();
    this.initSwagger();
    this.addErrorHandler();
    this.addRoutes();
    await this.connectToDatabase();
  }

  async connectToDatabase() {
    await Database.connect();
  }

  initHpp() {
    this.app.use(hpp());
  }

  initJsonParser() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initHelmet() {
    this.app.use(helmet());
  }

  initCors() {
    this.app.use(cors());
  }

  initCompression() {
    this.app.use(compression());
  }

  initSwagger() {
    const { env } = this.config;
    if (env !== "prod") {
      const swaggerSpec = swaggerJsdoc(swaggerOptions);
      this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
  }

  addErrorHandler() {
    this.app.use((error, req, res, next) => {
      logger.log("error", error);
      res.status(422).json({
        message : "Invalid request"
      });
    });
  }

  addRoutes() {
    const { apiPrefix } = this.config;
    this.app.use(apiPrefix, router);
  }

  run() {
    const { port } = this.config;
    this.app.listen(port, () => {
      logger.log("info", `Server listening on ${port}`);
    });
  }
}

module.exports = Server;