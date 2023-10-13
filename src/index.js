const Server = require("./Server");
const config = require("./config");

const server = new Server(config);
server.init();
server.run();