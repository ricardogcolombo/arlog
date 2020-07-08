const express = require("express");
var api = require('./api/api');
const config=  require('./config')

const app = express();
require('./middleware')(app,config.HOST,config.PORT);
app.use('/api/v1',api)

module.exports= app
