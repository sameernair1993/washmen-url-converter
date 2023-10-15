const validator = require("validator");
const { statusCodes } = require("../libs/constants");
const logger = require("../logger/Logger");
const { isWashmenWebUrl } = require("../libs/helpers");
const { Response, ErrorResponse } = require("../entities/response");

const validateWeblink = (req, res, next) => {
  const {
    body: { url: webUrl = "" } = {},
  } = req;
  let errorResponse = null;
  if (!webUrl || !validator.isURL(webUrl)) {
    errorResponse = new ErrorResponse({ error: "URL is not valid" }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else if (!isWashmenWebUrl(webUrl)) {
    errorResponse = new ErrorResponse({ error: "URL does not belong to Washmen" }, statusCodes.BAD_REQUEST);
    logger.log("error", errorResponse);
    Response.send(res, errorResponse);
  } else {
    next();
  }
};

module.exports = validateWeblink;