const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');

const User = require('./models/User');

const bcryptSalt = bcrypt.genSaltSync(10);

// .ENV
require('dotenv').config();

var corsOptions = {credential: true, origin: 'http://localhost:5173'};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('test ok');
});

// mongoose

mongoose.connect(process.env.MONGO_URL);

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error(error);
    res.status(500).json({message: 'Error creating user'});

    //   res.status(201).json({message: 'User created successfully'});
  }
});

app.listen(4000);
