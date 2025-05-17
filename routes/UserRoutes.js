const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.post('/', userController.createUsers);
router.get('/:Email', userController.getUsersById);
router.put('/:Email', userController.updateUsers);
router.delete('/:Email', userController.deleteUsers);
router.get('/', userController.getAllusers);
router.post('/resetpassword', userController.resetPassword);

module.exports = router;

// POST request to reset password