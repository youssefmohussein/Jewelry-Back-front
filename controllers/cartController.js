const CartItem = require('../models/cartModel');

// API: Get all cart items for a user
async function getCart(req, res) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: "Missing userId in query" });
    }

    const items = await CartItem.find({ userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// API: Add item to cart
async function addToCart(req, res) {
  try {
    const { name, price, quantity, image, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId in body" });
    }

    const newItem = new CartItem({ name, price, quantity, image, userId });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// API: Update cart item
async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const updatedItem = await CartItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// API: Delete cart item
async function removeFromCart(req, res) {
  try {
    const { id } = req.params;
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Shared logic: Get cart items for a user
async function getCartItemsByUser(userId) {
  try {
    return await CartItem.find({ userId });
  } catch (error) {
    console.error("Error in getCartItemsByUser:", error);
    return [];
  }
}

// EJS Page: Render cart view with data
async function renderCartPage(req, res) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send("Missing userId in query");
  }

  try {
    const items = await getCartItemsByUser(userId);
    res.render("cart", { items });
  } catch (error) {
    res.status(500).send("Error loading cart page");
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  getCartItemsByUser,
  renderCartPage,
};
