const Server = require("./Server");
const config = require("./config");
const startup = require("./startup");

const server = new Server(config);
server.init();
server.run();
startup();