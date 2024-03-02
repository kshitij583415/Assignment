const express = require('express');
const router = express.Router();
const {createPost,getPost}=require('../controller/post');

// router.get('/', async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   try {
//     const posts = await Post.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get("/",getPost);
router.post("/",createPost);


// router.post('/', async (req, res) => {
//     const post = new Post({
//       title: req.body.title,
//       body: req.body.body,
//     });
  
//     try {
//       const newPost = await post.save();
//       res.status(201).json(newPost);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });

module.exports = router;
