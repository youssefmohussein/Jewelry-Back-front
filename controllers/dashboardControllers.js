// controllers/dashboardControllers.js
const User = require('../models/users');

// Render the dashboard page
exports.renderDashboard = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from DB
     console.log('Users:', users);
    res.render('customers-dashboard', { users }); // Passing the data to the view
  } catch (err) {
     console.error('Error fetching users:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get All Users for the dashboard
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
     console.log('Fetched Users:', users);
    res.render('customers-dashboard', { users }); // Pass users data to EJS
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: err.message });
  }
};

// Edit User Role (Admin only)
exports.editUserRole = async (req, res) => {
  const { role } = req.body;
  if (role !== 'admin' && role !== 'customer') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


