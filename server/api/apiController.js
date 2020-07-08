const {nanoid} = require("nanoid");

const axios = require("axios");
const querystring = require("querystring");
const url = require("url");

let clients = {};
// Routes Callbacks
const getClients = (req, res) => {
    res.send(clients);
};
const redirectFile = (req, res, next) => {
    redirect(req, res, next, url, "/file?");
    res.send("ok");
};
const redirect = (req, res, next, url, route) => {
    const {serverId, ...data} = req.query;
    try {
        if (!clients[serverId]) {
            throw new Error("Client is not registered");
        }
        res.redirect(clients[serverId].url + route + querystring.stringify(data));
    } catch (e) {
        next(e);
    }
};

const redirectFolder = async (req, res, next) => {
    const {
        query: {url, serverId},
    } = req;
    try {
        if (!clients[serverId]) {
            throw new Error("Client is not registered");
        }

        let clientQuery = {url: url || "/"};
        let response = await axios.get(clients[serverId].url + "/folder", clientQuery);
        res.status(response.status).send(response.data);
    } catch (e) {
        next(e);
    }
};

const register = (req, res, next) => {
    const {
        body: {name, url},
    } = req;
    try {
        if (url && name) {
            return axios({
                mehtod: "get",
                url: url + "/health",
            })
                .then((response) => {
                    const id = nanoid();
                    clients[id] = {name: name, url: url};
                    // change this for a promise.all with the list of servers
                    res.status(response.status).send({serverId: id});
                })
                .catch((e) => {
                    next(e);
                });
        } else {
            res.status(400).send("User already registered");
        }
    } catch (e) {
        next(e);
    }
};
module.exports = {register, getClients, redirectFolder, redirectFile};
