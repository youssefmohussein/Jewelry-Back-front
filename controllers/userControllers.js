const mongoose = require('mongoose');
const User = require('../models/users');

// Create
exports.createUsers = async (req, res) => {
  try {
    const existingUser = await User.findOne({ Id: req.body.Id });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this Id already exists' });
    }
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

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", role: user.role || "user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update
exports.updateUsers = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { Id: Number(req.params.id) },
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
    const user = await User.findOne({ Id: Number(req.params.id) });
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
    const deletedUser = await User.findOneAndDelete({ Id: Number(req.params.id) });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
