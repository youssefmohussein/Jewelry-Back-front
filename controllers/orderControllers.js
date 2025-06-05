const mongoose = require("mongoose");
const orders = require("../models/orders");

exports.createOrder = async (req, res) => {
  try {
    const existingOrder = await orders.findOne({ Id: req.body.orderId });
    if (existingOrder) {
      return res
        .status(400)
        .json({ error: "Order with this Id already exists" });
    }
    const Order = new orders(req.body);
    await Order.save();
    console.log("order saved");
    res.status(200).json(Order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const Order = await orders.findById( req.params.id );
    if (!Order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const Orders = await orders.find();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving orders", error: err });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await orders.findOneAndUpdate(
      { Id: req.params.id },
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orders.findOneAndDelete({ Id: req.params.id }); 
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    } else res.status(200).json({ message: "order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
