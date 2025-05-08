const express = require('express');
const app = express();
const port = process.env.port || 8000;
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/ProductRoutes');
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('API Running: Product Management');
});



// Register routes
app.use('/products', ProductRoutes);

mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/")
    .then(() => {
        app.listen(port, () => {
            console.log('http://localhost:8000');
        })
    }).catch((err) => {
        console.log(err)
    });

    