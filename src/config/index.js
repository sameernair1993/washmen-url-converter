require("dotenv").config();

module.exports = Object.freeze({
  port: process.env.NODE_PORT,
  env: process.env.NODE_ENV,
  apiPrefix: process.env.API_PREFIX,
  mongoUri: process.env.MONGO_URI,
  baseWebUrl: process.env.BASE_WEB_URL,
  baseDeepLink: process.env.BASE_DEEP_LINK,
});