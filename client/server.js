const express = require("express");
var api = require("./api/api");
const config = require("./config");

const app = express();
require("./middleware")(app, config.HOST, config.PORT);
app.use("/api/v1", api);

app.use(function(error, req, res, next) {
    if (error.message.indexOf('File')>-1|| error.message.indexOf('Folder')>-1 ) {
        res.status(404);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
});
module.exports = app;
