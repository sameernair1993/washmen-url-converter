const validator = require("validator");
const logger = require("../logger/Logger");
const { statusCodes } = require("../libs/constants");
const { isWashmenWebUrl, parseUrl } = require("../libs/helpers");
const { errors, SECURE_PROTOCOL } = require("../libs/constants");
const { Response, ErrorResponse } = require("../entities/response");

const validateWeblink = (req, res, next) => {
  const {
    body: { url: webUrl = "" } = {},
  } = req;
  let errorResponse = null;
  const parsedUrl = parseUrl(webUrl);
  if (!webUrl || !validator.isURL(webUrl)) {
    errorResponse = new ErrorResponse({ error: errors.INVALID_URL }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else if (parsedUrl?.protocol !== SECURE_PROTOCOL) {
    errorResponse = new ErrorResponse({ error: errors.UNSECURE_URL }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else if (!isWashmenWebUrl(webUrl)) {
    errorResponse = new ErrorResponse({ error: errors.NOT_WASHMEN_URL }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else {
    next();
  }
};

module.exports = validateWeblink;