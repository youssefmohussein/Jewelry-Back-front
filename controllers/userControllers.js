const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Create
exports.createUsers = async (req, res) => {
  try {
    const existingUser = await User.findOne({ Email: req.body.Email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this Email already exists' });
    } 

    // Create new user without setting an 'Id' since MongoDB will handle the '_id'
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.registerUser = async (req, res) => {
  try {
    const { name, Email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, Email, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { Email, password } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful!",
      role: user.Role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update
exports.updateUsers = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Email: Number(req.params.Email) },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findOne({ Email: Number(req.params.Email) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
exports.getAllusers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteUsers = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ Email: Number(req.params.Email) });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { Email, password, confirmPassword } = req.body;

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


