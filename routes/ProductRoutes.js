const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductControllers');

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/', productController.getAllProducts);
module.exports = router;