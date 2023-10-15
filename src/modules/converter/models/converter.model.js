const mongoose = require("mongoose");
const converterSchema = require("./converter.schema");

converterSchema.index({ createdDate: -1 });
converterSchema.index({ weblink: 1, deeplink: 1 });

const ConverterModel = mongoose.model('url', converterSchema);

module.exports = ConverterModel;