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
 * /file:
 *   get:
 *     description: get File
 *     parameters:
 *       - name: filename
 *         in: query
 *         description: name of the file to get
 *         required: true
 *       - name: url
 *         in: query
 *         description:  path of the file
 *         required: false
 *       - name: search
 *         in: query
 *         description: string to search in file and return lines with that string
 *         required: false
 *       - name: limit
 *         in: query
 *         description: limit of lines returned
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: file data
 */
router.route("/file").get(controller.getFile);

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
