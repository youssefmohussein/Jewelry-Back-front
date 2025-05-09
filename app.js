const express = require('express');
const app = express();
const port = process.env.port || 8000;
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require('./routes/UserRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('login page'); // assuming your file is named "login page.ejs" and is inside the "views" folder
});

mongoose.connect("mongodb+srv://youssefsessions:6FSwstyc88Zzyt1p@cluster0.wiyaeee.mongodb.net/")
    .then(() => {
        app.listen(port, () => {
            console.log('http://localhost:8000');
        })
        // POST /users/register
        router.post("/register", async (req, res) => {
        const { name, Email, password } = req.body;
        try {
        const newUser = new User({ name, Email, password });
        await newUser.save();
        res.send("User registered successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  const { Email, password } = req.body;
  const user = await User.findOne({ Email });

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }

  res.send("Login successful");
});

    }).catch((err) => {
        console.log(err)
    });

    