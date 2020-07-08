let router = require("express").Router();
const controller = require("./apiController");

// ROUTES
/**
 * @swagger
 * /clients:
 *   get:
 *     description: get of registered clients
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: file data
 */
router.route("/clients?").get(controller.getClients);

/**
 * @swagger
 *
 * /file:
 *   get:
 *     description: get File
 *     parameters:
 *       - name: serverId
 *         in: query
 *         description: server id
 *         required: true
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
router.route("/file").get(controller.redirectFile);

//
/**
 * @swagger
 *
 * /folder:
 *   get:
 *     description: get folder
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: serverId
 *         in: query
 *         description:  id for the server
 *         required: true
 *         type: string
 *       - name: url
 *         in: query
 *         description:  path of the folder
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: file data
 */
router.route("/folder/").get(controller.redirectFolder);
/**
 * @swagger
 * /register:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: url
 *         description: endpoint url
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.route("/register").post(controller.register);

module.exports = router;
