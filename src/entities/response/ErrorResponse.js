const { statusCodes } = require("../../libs/constants");

class ErrorResponse {
  constructor(
    data = {},
    code = statusCodes.INTERNAL_SERVER_ERROR,
  ) {
    this.data = {
      success: false,
      ...data,
    };
    this.metadata = { code, timestamp: new Date() };
  }
}

module.exports = ErrorResponse;