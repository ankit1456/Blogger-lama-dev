const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//!REGISTER****
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

//!LOGIN****

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "wrong credentials try again",
      });
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json({
        status: "fail",
        message: "wrong credentials try again",
      });
    }
    const { __v, password, ...others } = user._doc;
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
