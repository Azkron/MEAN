const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Post = require('./models/post');
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
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  // .body is added by app.use(bodyParser.json()); above
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();

  // 201 stands for "Success, a new resource was created"
  res.status(201).json({
    message: 'Post added successfully',
    postId: post._id
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      // status 200 is standard for 'success'
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Post deleted!'})
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({message: 'err'})
    });
})


module.exports = app;
