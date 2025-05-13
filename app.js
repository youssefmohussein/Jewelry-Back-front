const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  // Fix: Import body-parser
const port = process.env.PORT || 8000;

// Routes
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');
const mainPage = require('./routes/mainPage');
const collectionRoutes = require('./routes/collectionRoute');  // Fix: Correct variable name

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine and static files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Route registration
app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);
app.use('/', mainPage);
app.use('/collections', collectionRoutes);  // Fix: Correct variable name

app.get('/home', (req, res) => {
  res.render('homePage');
});

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
