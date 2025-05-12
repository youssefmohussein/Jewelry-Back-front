const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');


// Routes
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');
const mainPage = require('./routes/mainPage'); 
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('views'));

// Route registration
app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);
app.use('/', mainPage);



// MongoDB connection
mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
