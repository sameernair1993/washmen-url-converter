const mongoose = require("mongoose");

const converterSchema = new mongoose.Schema({
  weblink: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  deeplink: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  createdDate: { type: Date, default: new Date() },
});

module.exports = converterSchema;