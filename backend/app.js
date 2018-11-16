const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/post');


const app = express();

// cloud atlas 'mongodb+srv://AKZRON:*Gayao1988@cluster0-jpyvm.mongodb.net/MEAN?retryWrites=true'
// local mongoDB 'mongodb://localhost:27017'

mongoose.connect('mongodb://localhost:27017/MEAN')
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log('Connection to database failed with ERROR = ' + err));

// Parses the req body into a JSON object and adds it to req
app.use(bodyParser.json());

// not necessary here as our body is always JSON
app.use(bodyParser.urlencoded({ extended : false }));

app.use((req, res, next) => {
  res.setHeader('access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
