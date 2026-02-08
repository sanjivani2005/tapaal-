const serverless = require("serverless-http");
const app = require("../backend/server/server");

module.exports = serverless(app);
