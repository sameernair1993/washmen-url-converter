const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../logger/Logger");

class Database {
  static async connect() {
    try {
      await mongoose.connect(config.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.log('info', 'Successfully connected to mongo');
    } catch (error) {
      logger.log('error', { message: 'Error connecting to mongo', data: error });
    }
  }
}

module.exports = Database;