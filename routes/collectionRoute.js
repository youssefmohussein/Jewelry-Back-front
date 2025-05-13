const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const Product = require('../models/Products');
const Collection = require('../models/collection');

// Route to create a new collection (POST)
router.post('/create', collectionController.createCollection);

// Route to get collection by name (GET)
router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    // Find the collection by name
    const collection = await Collection.findOne({ name });

    if (!collection) {
      return res.status(404).send('Collection not found');
    }

    // Find products in this collection
    const products = await Product.find({ Collection: name });

    //  Get all collections for the header menu
    const collections = await Collection.find();

    //  Render the view with all necessary data
    res.render('collectionPage', {
      collection,
      products,
      collections // now header.ejs will work!
    });
  } catch (error) {
    console.error('Error loading collection:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
