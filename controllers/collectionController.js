const Collection = require('../models/collection');

// Create a new collection
// Create a new collection
exports.createCollection = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: 'Both fields are required.' });
    }

    const newCollection = new Collection({ name, image });
    await newCollection.save();

    // After saving, dynamically create a route for the collection
    
    res.status(201).json({ message: 'Collection created and route generated', collection: newCollection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all collections and render them in the dropdown
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({});
    res.render('collectionsPage', { collections });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
