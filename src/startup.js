const ProductService = require("./modules/product/product.service");

const startup = async () => {
  await ProductService.seed();
};

module.exports = startup;