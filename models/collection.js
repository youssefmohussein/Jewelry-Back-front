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
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
