const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

//!CREATE POST ****
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      newPost,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

//!UPDATE POST *********
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          status: "success",
          updatedPost,
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      }
    } else {
      res.status(401).json({
        status: "fail",
        message: "You can update only your post 🙂",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

//!DELETE POST *****
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: "success",
          data: null,
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err.message,
        });
      }
    } else {
      res.status(401).json({
        status: "fail",
        message: "You can delete only your post 🙂",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

//!GET POST *****
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

//!GET ALL POSTS*****

router.get("/", async (req, res) => {
  const username = req.query.user;
  const cat = req.query.cat;
  try {
    let AllPosts;
    if (username) {
      AllPosts = await Post.find({ username });
    } else if (cat) {
      AllPosts = await Post.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      AllPosts = await Post.find();
    }
    res.status(200).json({
      status: "success",
      results: AllPosts.length,
      data: {
        AllPosts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});
module.exports = router;
