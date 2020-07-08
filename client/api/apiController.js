const {existsSync, readdirSync, readFileSync, statSync} = require("fs");

// TODO send this in a parameter
const config = require("../config");

const TYPES = {
    FOLDER: "folder",
    FILE: "file",
};
const BASE_PATH = config.PATH;

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

const healthCheck = (req, res) => {
    res.status(200).send("OK");
};

//FOLDER METHODS
const getFolder = (req, res, next) => {
    let {
        query: {url},
    } = req;
    try {
        let v = getCompletePath(url);
        let data = getFolderInfo(v);
        res.send(data);
    } catch (e) {
        next(e);
    }
};

const getCompletePath = (path, filename) => {
    let fullPath = path ? BASE_PATH + path : BASE_PATH + "";
    fullPath = fullPath.slice(-1) !== "/" ? fullPath + "/" : fullPath;
    fullPath = filename ? fullPath + filename : fullPath;
    return fullPath;
};

// FILE METHODS
const getFile = (req, res, next) => {
    let {
        query: {url, filename, limit, search},
    } = req;
    try {
        const path = getCompletePath(url, filename);
        const data = readFileFromPath(path, parseInt(limit), search);
        res.send(data);
    } catch (e) {
        next(e);
    }
};

const readFileFromPath = (urlPath, limit = 0, search = "") => {
    if (existsSync(urlPath) && statSync(urlPath).isFile()) {
        let data = readFileSync(urlPath, "utf8")
            .split("\n")
            .filter((item) => item.length > 0)
            .reverse();
        return data.filter((item, index) => {
            let validate = true;
            if (search.length > 0) {
                validate = validate && item.indexOf(search) !== -1;
            }
            if (limit > 0 && limit < index + 1) {
                validate = false;
            }
            return validate;
        });
    } else {
        throw new Error("File not found");
    }
};

module.exports = {
    getFile,
    getFolder,
    healthCheck,
};
