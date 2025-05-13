const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // Remove the unique constraint if you want duplicates
    // unique: true, // Remove this line
  },
  image: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
