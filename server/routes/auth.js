const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json("User not found");

    if (user.password !== req.body.password) {
      return res.status(400).json("Wrong password");
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;