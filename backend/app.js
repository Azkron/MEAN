const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  // .body is added by app.use(bodyParser.json()); above
  const post = req.body
  console.log(post);
  // 201 stands for "Success, a new resource was created"
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'sdfj234j654j',
      title: 'First server-side post',
      content: 'This is comming from the server'
    },
    {
      id: '9054jk4ju59u90o',
      title: 'Second server-side post',
      content: 'This is comming from the server!'
    }
  ];
  // This attaches the status and json data to the "res" object which is sent to the response
  // status 200 is standard for 'success'
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});



module.exports = app;
