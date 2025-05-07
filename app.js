const express = require('express');
const app = express();
const port = process.env.port || 8000;
const mongoose = require('mongoose');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Joe');
})


mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/")
    .then(() => {
        app.listen(port, () => {
            console.log('http://localhost:8000');
        })
    }).catch((err) => {
        console.log(err)
    });