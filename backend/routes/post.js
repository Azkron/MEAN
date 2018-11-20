const express = require('express');

const Post = require('../models/post');

const router = express.Router();


router.get('', (req, res, next) => {
  Post.find()
    .then(documents => {
      // status 200 is standard for 'success'
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then( post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found'});
      }
    });
});

router.post('', (req, res, next) => {
  // .body is added by app.use(bodyParser.json()); above
  console.log(req.body);
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

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.delete('/:id', (req, res, next) => {
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

module.exports = router;
