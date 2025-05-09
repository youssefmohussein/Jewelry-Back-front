const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

// Routes
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine and static files
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route registration
app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);

app.get('/', (req, res) => {
  res.render('login page'); // Make sure 'views/login page.ejs' exists
});

// MongoDB connection
mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
