const { statusCodes } = require("../libs/constants");
const logger = require("../logger/Logger");
const { isWashmenDeepLink, sanitizeDeeplink } = require("../libs/helpers");
const { Response, ErrorResponse } = require("../entities/response");
const { errors } = require("../libs/constants");

const validateDeeplink = (req, res, next) => {
  const {
    body: { url: deeplink = "" } = {},
  } = req;
  let errorResponse = null;
  if (!deeplink || !sanitizeDeeplink(deeplink)) {
    errorResponse = new ErrorResponse({ error: errors.INVALID_URL }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else if (!isWashmenDeepLink(deeplink)) {
    errorResponse = new ErrorResponse({ error: errors.NOT_WASHMEN_URL }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  }
  else {
    next();
  }
};

module.exports = validateDeeplink;