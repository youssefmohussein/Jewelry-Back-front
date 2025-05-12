const express = require('express');
const router = express.Router();

// Homepage route
router.get('/', (req, res) => {
    res.render('homePage'); // renders views/home.ejs
});


router.get('/login', (req, res) => {
  res.render('login page'); 
});

router.get('/forgetpassword',(req,res)=>{

    res.render('reset');
});

module.exports = router;
