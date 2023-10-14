const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true },
  subPath: { type: String, required: true },
  productId: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
});

module.exports = productSchema;