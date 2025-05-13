const Collection = require('../models/collection');
const Product = require('../models/Products');

// Create collection
exports.createCollection = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Basic validation
    if (!name || !image) {
      return res.status(400).json({ message: 'Both name and image are required.' });
    }

    // Create and save the new collection
    const newCollection = new Collection({ name, image });
    await newCollection.save();

    res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Render collection page
exports.viewCollection = async (req, res) => {
  const { collectionName } = req.params; // Get collection name from the URL parameter

  try {
    const collection = await Collection.findOne({ name: collectionName });

    if (collection) {
      res.render('collectionPage', { collection }); // Render a view with collection data
    } else {
      res.status(404).send('Collection not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
