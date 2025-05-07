const express = require('express');
const app = express();
const port = process.env.port || 8000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Joe');
})
app.listen(port, () => {
    console.log('joe');
})