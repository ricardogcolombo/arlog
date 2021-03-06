const morgan = require("morgan");
// setup global middleware here
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

module.exports = function(app,HOST,PORT) {
    app.use(morgan("common"));
    const swaggerOps = {
        swaggerDefinition: {
            info: {
                title: "Logger API",
                description: "Logger API Documentation",
                servers: [`http://${HOST}:${PORT}/api/v1`],
            },
        },
        apis: ["api/api.js"],
    };

    const swaggerDoc = swaggerJsDoc(swaggerOps);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
