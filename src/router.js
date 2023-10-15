const express = require("express");
const pjson = require("pjson");
const logger = require("./logger/Logger");
const converterRouter = require("./modules/converter/converter.routes");

const router = express.Router();

router.use("/convert", converterRouter);
/**
 * @swagger
 * tags:
 *  name: HealthCheck
 *  description: Checks if the service is running by returning 200 response
 * /api/health-check:
 *  get:
 *    summary: Get health status
 *    tags: [HealthCheck]
 *    responses:
 *       200:
 *         description: Healthy
 */

router.get("/health-check", (req, res) => {
  res.status(200).send("Healthy");
});

/**
 * @swagger
 * components:
 *   schemas:
 *     version:
 *       type: object
 *       required:
 *         - version
 *         - name
 *         - description
 *       properties:
 *         version:
 *           type: string
 *           description: The API version
 *         name:
 *           type: string
 *           description: The name of the service
 *         description:
 *           type: string
 *           description: Service description
 *       example:
 *         version: 1.0.0
 *         name: Washmen
 *         description: URL conversion service
 */

/**
 * @swagger
 * tags:
 *  name: Version
 *  description: Fetch current version, name and description of the service
 * /api/version:
 *  get:
 *    summary: Get version
 *    tags: [Version]
 *    responses:
 *       200:
 *         description: 200
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/version'
 */

router.get("/version", (req, res) => {
  const { version, name, description } = pjson;
  logger.log(
    "info",
    { version, name, description },
  );
  res.status(200).json({
    description,
    name,
    version
  });
});

module.exports = router;