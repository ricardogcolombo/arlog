let router = require("express").Router();
const controller = require("./apiController");

// Routes
/**
 * @swagger
 *  /health:
 *      get:
 *          description: health check endpoint too see if the server is running
 *      responses:
 *          '200':
 *              description: successful response, server is running
 */
router.route("/health").get(controller.healthCheck);

/**
 * @swagger
 *
 * /folder:
 *   get:
 *     description: get folder
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         in: query
 *         description:  path of the folder
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: file data
 */
router.route("/folder").get(controller.getFolder);
module.exports = router;
