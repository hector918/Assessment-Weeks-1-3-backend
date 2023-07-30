// DEPENDENCIES
const http = require("http");
const https = require("https");
const fs = require('fs');
const app = require("./app.js");
const dotenv = require("dotenv");
// CONFIGURATION
dotenv.config();
const {PORT, HTTPS_PORT} = process.env;
const options = {
  key: fs.readFileSync('./sslcert/localhost-key.pem', 'utf8'),
  cert: fs.readFileSync('./sslcert/localhost.pem', 'utf8')
}
// LISTEN
https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`Https Listening on port ${HTTPS_PORT}`);
});
http.createServer(app).listen(PORT, () => {
  console.log(`Http Listening on port ${PORT}`);
});