let router = require("express").Router();
const controller = require("./apiController");

router.route("/health").get(controller.healthCheck);

module.exports = router;
