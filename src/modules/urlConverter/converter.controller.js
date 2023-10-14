const converterService = require("./converter.service");
const { Response, SuccessResponse, ErrorResponse } = require("../../entities/response");
const { statusCodes } = require("../../libs/constants");

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
      const responseObj = new SuccessResponse({ deeplink }, statusCodes.CREATED);
      Response.send(res, responseObj);
    } catch (error) {
      const errorResponse = new ErrorResponse({ error: error?.message ?? error }, statusCodes.INTERNAL_SERVER_ERROR);
      Response.send(res, errorResponse);
    }
  }

  async deepToWeblink(req, res) {
    try {
      const { body: { url } } = req;
      const weblink = await converterService.createWeblink(url);
      const responseObj = new SuccessResponse({ weblink }, statusCodes.CREATED);
      Response.send(res, responseObj);
    } catch (error) {
      const errorResponse = new ErrorResponse({ error: error?.message ?? error }, statusCodes.INTERNAL_SERVER_ERROR);
      Response.send(res, errorResponse);
    }
  }
};

module.exports = ConverterController.getInstance();