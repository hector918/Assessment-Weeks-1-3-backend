// DEPENDENCIES
const http = require("http");
const app = require("./app.js");
const dotenv = require("dotenv");
// CONFIGURATION
dotenv.config();
var {PORT} = process.env;
PORT = PORT || 8888;
// LISTEN
http.createServer(app).listen(PORT, () => {
  console.log(`Http Listening on port ${PORT}`);
});