const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    maxlength: 500,
  },
  Colors: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.every(color => typeof color === 'string');
      },
      message: 'Each color must be a string.',
    },
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Collection: {
    type: String,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
    min: 0,
  },
  InStock: {
    type: Boolean,
    default: true,
  },
  Price: {
    type: Number,
    required: true,
    min: 0,
  },
  Image: {
    type: [String], // URLs
    required: true,
  },
  SalesCount: {
    type: Number,
    default: 0,
  },
  TotalSales: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
