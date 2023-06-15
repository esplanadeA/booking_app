const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const jwtSecret = 'sdafshkjguwyeiyjkjs';

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

// mongoose connection

mongoose.connect(process.env.MONGO_URL);

// register
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
    console.error(error);
    res.status(500).json({message: 'Error creating user'});
  }
});

//handle login

app.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // jwt token
      jwt.sign(
        {email: userDoc.email, id: userDoc._id},
        jwtSecret,
        {},
        function (err, token) {
          if (err) {
            console.error(err);
            res.status(500).json({message: 'Error signing JWT token'});
          } else {
            res.cookie('token', token).json(userDoc);
          }
        }
      );
    } else {
      res.status(422).json({message: 'Invalid password'});
    }
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

app.get('/profile', (req, res) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      if (user) {
        // Send the user information as JSON response
        res.json(user);
      } else {
        res.status(404).json({message: 'User not found'});
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({message: 'Error retrieving user information'});
    });
});

app.listen(4000);
