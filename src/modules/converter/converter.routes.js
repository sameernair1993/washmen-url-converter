const express = require("express");
const converterController = require("./converter.controller");
const validateWeblink = require("../../middlewares/validateWeblink");
const validateDeeplink = require("../../middlewares/validateDeeplink");

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: WebToDeep
 *  description: Converts a given web url to its equivalent deep link
 * /api/convert/web-to-deep:
 *  post:
 *    summary: Convert weburl to deeplink
 *    tags: [WebToDeep]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *                description: the web url to be converted
 *                example: https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw
 *    responses:
 *       201:
 *         description: 201
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/201'
 *       400:
 *         description: 400
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/400'
 *       500:
 *         description: 500
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/500'
 */
router.post(
  '/web-to-deep',
  validateWeblink,
  converterController.webToDeeplink
);

/**
 * @swagger
 * tags:
 *  name: DeepToWeb
 *  description: Converts a given web url to its equivalent deep link
 * /api/convert/deep-to-web:
 *  post:
 *    summary: Convert deeplink to weburl
 *    tags: [DeepToWeb]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *                description: the deep link to be converted
 *                example: washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw
 *    responses:
 *       201:
 *         description: 201
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/201'
 *       400:
 *         description: 400
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/400'
 *       500:
 *         description: 500
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/500'
 */
router.post(
  '/deep-to-web',
  validateDeeplink,
  converterController.deepToWeblink
);

/**
 * @swagger
 * components:
 *   schemas:
 *     201:
 *       type: object
 *       required:
 *         - data
 *         - metadata
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *              success:
 *                type: boolean
 *                description: Field shows whether the result is a success or not
 *              url:
 *                type: string
 *                description: The converted weburl to deeplink. or deeplink to weburl
 *         metadata:
 *           type: object
 *           properties:
 *              code:
 *                type: number
 *                description: Response status code
 *              timestamp:
 *                type: date
 *                description: The timestamp when the response was generated and returned.
 *       example:
 *         data:
 *          success: true
 *          url: washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw
 *         metadata:
 *          code: 201
 *          timestamp: 2023-10-14T15:04:06.775Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     400:
 *       type: object
 *       required:
 *         - data
 *         - metadata
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *              success:
 *                type: boolean
 *                description: Field shows whether the result is a success or not
 *              error:
 *                type: string
 *                description: The error description
 *         metadata:
 *           type: object
 *           properties:
 *              code:
 *                type: number
 *                description: Response status code
 *              timestamp:
 *                type: date
 *                description: The timestamp when the response was generated and returned.
 *       example:
 *         data:
 *          success: false
 *          error: URL is not valid
 *         metadata:
 *          code: 400
 *          timestamp: 2023-10-14T15:04:06.775Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     500:
 *       type: object
 *       required:
 *         - data
 *         - metadata
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *              success:
 *                type: boolean
 *                description: Field shows whether the result is a success or not
 *              error:
 *                type: string
 *                description: The error description
 *         metadata:
 *           type: object
 *           properties:
 *              code:
 *                type: number
 *                description: Response status code
 *              timestamp:
 *                type: date
 *                description: The timestamp when the response was generated and returned.
 *       example:
 *         data:
 *          success: false
 *          error: We have encountered an error. Please try again later.
 *         metadata:
 *          code: 500
 *          timestamp: 2023-10-14T15:04:06.775Z
 */

module.exports = router;
