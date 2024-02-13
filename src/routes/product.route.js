const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('@controllers/product.controller');
const { isAuthenticated, isAdmin } = require('@middlewares/auth');

// init routes
router.post('/', isAuthenticated, isAdmin, createProduct);
router.get('/', getProducts);
module.exports = router;