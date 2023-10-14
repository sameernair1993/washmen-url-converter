const mongoose = require("mongoose");
const productSchema = require("./product.schema");

productSchema.index({ productId: 1 });
module.exports = new mongoose.model('Product', productSchema);