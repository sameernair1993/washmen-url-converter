const validator = require("validator");
const { statusCodes } = require("../libs/constants");
const logger = require("../logger/Logger");
const { isWashmenWebUrl } = require("../libs/helpers");
const { Response } = require("../entities/response");

const validateWeblink = (req, res, next) => {
  const {
    body: { url: webUrl = "" } = {},
  } = req;
  if (!webUrl || !validator.isURL(webUrl)) {
    Response.send(res, {
      success: false,
      data: "URL is not valid",
      metadata: {
        code: statusCodes.BAD_REQUEST,
        timestamp: new Date(),
      }
    });
  }
  if (!isWashmenWebUrl(webUrl)) {
    Response.send(res, {
      success: false,
      data: "URL does not belong to Washmen",
      metadata: {
        code: statusCodes.BAD_REQUEST,
        timestamp: new Date(),
      }
    });
  }
  next();
};

module.exports = validateWeblink;