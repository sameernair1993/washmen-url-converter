const validator = require("validator");
const { statusCodes } = require("../libs/constants");
const logger = require("../logger/Logger");
const { isWashmenWebUrl, sanitizeDeeplink } = require("../libs/helpers");
const { Response, ErrorResponse } = require("../entities/response");

const validateDeeplink = (req, res, next) => {
  const {
    body: { url: deeplink = "" } = {},
  } = req;
  let errorResponse = null;
  if (!deeplink || !sanitizeDeeplink(deeplink)) {
    errorResponse = new ErrorResponse({ error: "URL is not valid" }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else {
    next();
  }
};

module.exports = validateDeeplink;