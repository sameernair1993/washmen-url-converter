const converterService = require("./converter.service");
const { Response, SuccessResponse, ErrorResponse } = require("../../entities/response");
const { statusCodes } = require("../../libs/constants");
const logger = require("../../logger/Logger");

class ConverterController {
  static getInstance() {
    if (!ConverterController.instance) {
      ConverterController.instance = new ConverterController();
    }
    return ConverterController.instance;
  }

  async webToDeeplink(req, res) {
    try {
      const  { body: { url } } = req;
      const deeplink = await converterService.createDeeplink(url);
      const responseObj = new SuccessResponse({ url: deeplink }, statusCodes.CREATED);
      Response.send(res, responseObj);
    } catch (error) {
      logger.log("error", error);
      Response.send(res, error);
    }
  }

  async deepToWeblink(req, res) {
    try {
      const { body: { url } } = req;
      const weblink = await converterService.createWeblink(url);
      const responseObj = new SuccessResponse({ url: weblink }, statusCodes.CREATED);
      Response.send(res, responseObj);
    } catch (error) {
      logger.log("error", error);
      Response.send(res, error);
    }
  }
};

module.exports = ConverterController.getInstance();