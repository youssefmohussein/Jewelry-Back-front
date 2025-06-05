const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');

router.post('/', orderControllers.createOrder);
router.get('/:id', orderControllers.getOrderById);
router.get('/', orderControllers.getAllOrders);
router.put('/:id', orderControllers.updateOrder);
router.delete('/:id', orderControllers.deleteOrder);

module.exports = router;