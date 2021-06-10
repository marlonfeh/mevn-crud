const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//require('dotenv').config();

const app = express();

const notesRoutes = require('./routes/notes');

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

//Simulated Latency
app.use(function(req,res,next){setTimeout(next,1000)});

// note routes
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});