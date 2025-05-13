const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create collection
router.post('/create-collection', adminController.createCollection);

// Render collection by name
router.get('/collection/:name', adminController.renderCollection);

module.exports = router;
