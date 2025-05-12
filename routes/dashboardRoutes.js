const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardControllers');

// Dashboard Routes
router.get('/customers-dashboard', dashboardController.renderDashboard); // View Dashboard
router.get('/customers-dashboard', dashboardController.getAllUsers); // Get All Users
router.put('/users/:id/edit', dashboardController.editUserRole); // Edit User Role
router.delete('/users/:id/delete', dashboardController.deleteUser); // Delete User
router.get('/customers-dashboard', (req, res) => {
  res.render('customers-dashboard');  
});
module.exports = router;
