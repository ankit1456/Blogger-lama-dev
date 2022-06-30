const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");

//!CREATE POST ****
router.post("/", async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      newCat,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCats = await Category.find();
    res.status(200).json({
      status: "success",
      results: allCats.length,
      data: {
        allCats,
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
