const config = require("../config");
const {existsSync, readdirSync,  statSync} = require("fs");

const TYPES = {
    FOLDER: "folder",
    FILE: "file",
};
const BASE_PATH = config.PATH;

const healthCheck = (req, res) => {
    res.status(200).send("OK");
};

//FOLDER METHODS
const getFolder = (req, res, next) => {
    let {
        query: {url},
    } = req;
    let v = getCompletePath(url);
    let data = getFolderInfo(v);
    res.send(data);
};

const getCompletePath = (path, filename) => {
    let fullPath = path ? BASE_PATH + path : BASE_PATH + "";
    fullPath = fullPath.slice(-1) !== "/" ? fullPath + "/" : fullPath;
    fullPath = filename ? fullPath + filename : fullPath;
    return fullPath;
};

const getFolderInfo = (urlPath) => {
    if (existsSync(urlPath) && statSync(urlPath).isDirectory()) {
        return readdirSync(urlPath, {withFileTypes: true}).map((item) => {
            if (item.isDirectory()) {
                return {name: item.name, type: TYPES.FOLDER};
            } else {
                return {name: item.name, type: TYPES.FILE};
            }
        });
    } else {
        throw new Error(`Folder ${urlPath} not found `);
    }
};

module.exports = {
    healthCheck,
    getFolder,
};
