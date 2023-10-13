require("dotenv").config();

module.exports = Object.freeze({
  port: process.env.NODE_PORT,
  env: process.env.NODE_ENV,
  apiPrefix: process.env.API_PREFIX,
});