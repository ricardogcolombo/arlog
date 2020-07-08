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
    if (clients[serverId]) {
        res.redirect(clients[serverId].url + route + querystring.stringify(data));
        next();
    } else {
        throw new Error("Client is not registered");
    }
};
const redirectFolder = (req, res, next) => {
    redirect(req, res, next, url, "/folder?");
    res.send("ok");
};
const register = (req, res, next) => {
    const {
        body: {name, url},
    } = req;
    try {
        if (url && name) {
            // TODO: create a promise (promsise.all and get many response from more than 1 sever)
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
module.exports = {register,getClients,redirectFolder,redirectFile}
