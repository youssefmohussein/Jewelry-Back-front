const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find();
    res.render('homePage', { collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.render('homePage', { collections: [] });
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login page');
});

// Forget password route
router.get('/forgetpassword', (req, res) => {
  res.render('reset');
});

// About Us page
router.get('/about-us', async (req, res) => {
  try {
    const collections = await Collection.find();
    res.render('about', { collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.render('about', { collections: [] });
  }
});

// Admin dashboard product management route
router.get('/admin-dashboard/products', (req, res) => {
  res.render('productManagment');
});

// View specific collection page (e.g., /collections/youssef)
router.get('/collections/:collectionName', async (req, res) => {
  const { collectionName } = req.params;
  
  try {
    const collection = await Collection.findOne({ name: collectionName });
    const collections = await Collection.find();//header
    if (collection) {
      res.render('collectionPage', { collection, collections });
    } else {
      res.status(404).send('Collection not found');
    }
  } catch (error) {
    console.error('Error fetching collection:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
