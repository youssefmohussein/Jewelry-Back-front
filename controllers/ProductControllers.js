const mongoose = require('mongoose');
const Product = require('../models/Products');

// Create
exports.createProduct = async (req, res) => {
    try {
        // Check if product already exists by Id
        const existingProduct = await Product.findOne({ Id: req.body.Id });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this Id already exists' });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}          

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ Id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error', error: err });
    }
};




exports.getAllProducts = async (req, res) => {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving products', error: err });
    }
  };
  






// Update
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ Id: req.params.id }, req.body, { new: true }); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
// Delete product by custom Id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ Id: req.params.id }); // Use findOneAndDelete with the custom Id
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        else
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};