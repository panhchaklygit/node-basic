const express = require('express');
const router = express.Router();
// import routes
const productRoute = require('./product.route');
const userRoute = require('./user.route');
// init routes
router.use('/products', productRoute);
router.use('/users', userRoute);

module.exports = router;