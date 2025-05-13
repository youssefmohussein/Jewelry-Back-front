const express = require('express');
const router = express.Router();
//const adminRoutes = require('./routes/adminRoutes');
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



router.get('/login', (req, res) => {
  res.render('login page'); 
});

router.get('/forgetpassword',(req,res)=>{

    res.render('reset');
});

router.get('/home', (req, res) => {
  // Render the 'homePage' EJS file
  res.render('homePage');  
});

router.get('/about-us', async (req, res) => {
  try {
    const collections = await Collection.find();  // Assuming you're fetching collections from the database
    res.render('about', { collections });  // Pass collections to the 'about' view
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.render('about', { collections: [] });  // If there's an error, pass an empty array
  }
});


router.get('/admin-dashboard/products', (req, res) => {
  res.render('productManagment');
});


router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find({});
    res.render('homePage', { collections });
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.render('homePage', { collections: [] });
  }
});



module.exports = router;
