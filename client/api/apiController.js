
const config  = require('../config')

const TYPES = {
    FOLDER: "folder",
    FILE: "file",
};
const BASE_PATH = config.PATH

const healthCheck = (req, res) => {
    res.status(200).send("OK");
};

module.exports = {
    healthCheck
}
