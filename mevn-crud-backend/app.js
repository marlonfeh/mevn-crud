const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//require('dotenv').config();

const app = express();

const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const DB = 'mongodb://localhost:27017/mevn-crud-db';

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDB connected Successfully'))
  .catch((err) => console.log(err));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my REST API application." });
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Simulated Latency
app.use(function(req,res,next){setTimeout(next,1000)});

// note routes
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});