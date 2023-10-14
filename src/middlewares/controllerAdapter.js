const logger = require("../logger/Logger");

const controllerAdapter = (controller, functionName) => {
  return async function (req, res, next) {
    try {
      const result = await controller[functionName](req);
      console.log("REUSLT: ", result);
      res.json(result);
    } catch (error) {
      logger.log("error", {
        message: "Internal server error",
        data: error,
      });
      res.status(error?.status || 500).json({
        success: false,
        data: {
          error: 'We have encountered an error. Please try again later',
        },
      });
    }
  };
};

module.exports = controllerAdapter;