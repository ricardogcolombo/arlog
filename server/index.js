const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
require('./middleware')(app,HOST,PORT);

app.use('/api/v1/',require('./api/api'))

app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
});
