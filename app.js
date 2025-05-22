const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/UserRoutes');
const mainPageRoutes = require('./routes/mainPage');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { showErrorPage } = require('./utils/errorHandler');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Views and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Route usage
app.use('/', mainPageRoutes);
app.use('/', dashboardRoutes);
app.use('/collections', adminRoutes);  // admin routes under /admin
app.use('/admin', adminRoutes); 
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use((req, res) => {
  showErrorPage(res, 404, "That page does not exist", "/");
});
// Error handler middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).render('error', {
    code: status,
    message: err.message || "Something went wrong on the server.",
    backUrl: "/"
  });
});
// MongoDB connection
mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/myDatabase?retryWrites=true&w=majority")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
