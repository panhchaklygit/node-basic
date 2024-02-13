const Product = require('@models/mongo/product.model.js');
const redis = require('@config/redis');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await redis.get('products');
    if (products) {
      return  res.status(200).json({
        success: true,
        statusCode: 200,
        products: JSON.parse(products)
      });
    }
    const getProducts = await Product.find();
    if (getProducts) {
      await redis.set('products', JSON.stringify(getProducts));
      return  res.status(200).json({
        success: true,
        statusCode: 200,
        getProducts
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const createProduct = await Product.create(req.body);
    if (createProduct) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        createProduct
      });
    }
  }
  catch (error) {
    console.log(error);
    next(error);
  }
};