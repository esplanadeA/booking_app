const express = require('express');
var cors = require('cors');
const app = express();

var corsOptions = {credential: true, origin: 'http://localhost:5173'};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  console.log('Received data:', name, email, password);
  res.json({name, email, password});
  res.status(201).json({message: 'User created successfully'});
});

app.listen(4000);
