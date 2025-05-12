const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  Name: { 
    type: String, 
    required: true, 
    unique: true 
},
  Image: {
     type: String,
      required: true 
    },
});

module.exports = mongoose.model('Collection', collectionSchema);
