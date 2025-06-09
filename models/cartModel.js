const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Optional user reference
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);

