const Collection = require('../models/collection');
const Product = require('../models/Products');

// Create collection
exports.createCollection = async (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) return res.status(400).json({ message: 'Both fields are required.' });

  try {
    const newCollection = new Collection({ name, image });
    await newCollection.save();
    res.status(201).json({ message: 'Collection created', collection: newCollection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Render collection page
exports.renderCollection = async (req, res) => {
  const { name } = req.params;

  try {
    const collection = await Collection.findOne({ name });
    if (!collection) return res.status(404).send('Collection not found');

    const products = await Product.find({ Collection: name });
    const collections = await Collection.find();

    res.render('collectionPage', { collection, products, collections });
  } catch (error) {
    console.error('Error rendering collection:', error);
    res.status(500).send('Server error');
  }
};
