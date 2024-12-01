const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
// middleware
app.use(express.static('public'));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/auth_db'; // Local MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to local MongoDB");
    app.listen(3001);
  })
  .catch((err) => console.log(err));

// routes
app.get('*/',checkUser);  // will apply this middleware to all routes
app.get('/', (req, res) => res.render('home'));
//i used middleware to check the token
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);
app.listen(3000,)