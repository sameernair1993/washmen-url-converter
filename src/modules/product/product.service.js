const ProductModel = require("./models/product.model");
const { products } = require("../../libs/data");

class ProductService {
  static getInstance() {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getProduct(productId) {
    return await ProductModel.findOne({ productId });
  }

  async seed() {
    const count = await ProductModel.countDocuments();
    if (count > 0) return;
    await ProductModel.insertMany(products, { ordered: false });
  }
};

module.exports = ProductService.getInstance();