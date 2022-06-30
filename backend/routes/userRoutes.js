const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const Post = require("../models/postModel");
//!UPDATE****
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        updatedUser,
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "You can only update your account 🙂",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
//!DELEte USER *****
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found 🙂");
      }
      try {
        await Post.deleteOne({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: "success",
          data: null,
        });
      } catch (err) {
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "you can  delete only your account 🙂",
    });
  }
});

//!GET USER *****
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      status: "success",
      user: others,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
