const express = require("express");
const converterController = require("./converter.controller");
const controllerAdapter = require("../../middlewares/controllerAdapter");
const validateWeblink = require("../../middlewares/validateWeblink");

const router = express.Router();

router.post(
  '/web-to-deep',
  validateWeblink,
  converterController.webToDeeplink
);

router.post(
  '/deep-to-web',
  converterController.deepToWeblink
);

module.exports = router;
