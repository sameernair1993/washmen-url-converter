
class SuccessResponse {
  constructor(
    data = {},
    code = statusCodes.OK,
  ) {
    this.data = {
      success: true,
      ...data,
    };
    this.metadata = { code, timestamp: new Date() };
  }
}

module.exports = SuccessResponse;