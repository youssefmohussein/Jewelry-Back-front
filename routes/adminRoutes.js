const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create collection
router.post('/create', adminController.createCollection);

// Render collection by name
router.get('/collections/:collectionName', adminController.viewCollection);

module.exports = router;
