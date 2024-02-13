const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  product: {
    type: String,
    unique: true,
    required : [true, 'Please add a Product'],
  },

  description: {
    type: String,
    required : [true, 'Please add a Description'],
  },

  image: {
    type: String,
    required : [true, 'Please add an Image'],
  },

  category: {
    type: String,
    required : [true, 'Please add a Category'],
  },

  price: {
    type: Number,
    required : [true, 'Please add a Price'],
  }

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);