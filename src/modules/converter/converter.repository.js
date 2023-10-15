const ConverterModel = require("./models/converter.model");

class ConverterRepository {
  static getInstance() {
    if (!ConverterRepository.instance) {
      ConverterRepository.instance = new ConverterRepository();
    }
    return ConverterRepository.instance;
  }

  async getUrl(options) {
    return ConverterModel.findOne(options);
  }

  async saveUrl(options) {
    return ConverterModel.create(options);
  }
}

module.exports = ConverterRepository.getInstance();