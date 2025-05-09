const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/', userController.createUsers);
router.get('/:id', userController.getUsersById);
router.put('/:id', userController.updateUsers);
router.delete('/:id', userController.deleteUsers);
router.get('/', userController.getAllusers);

module.exports = router;
