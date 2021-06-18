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

//Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my REST API application." });
});

app.use((req, res, next) => {
  /*
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  */
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Simulated Latency
app.use(function(req,res,next){setTimeout(next,800)});

//Note routes
app.use('/notes', notesRoutes);
//Auth routes
app.use('/auth', authRoutes);

//Error Handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});