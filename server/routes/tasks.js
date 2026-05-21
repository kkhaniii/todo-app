const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
// ADD
router.post("/", async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const { title, userId } = req.body;

    const newTask = new Task({
      title,
      userId,
      completed: false,
    });

    const saved = await newTask.save();

    console.log("SAVED:", saved); 

    res.json(saved);
  } catch (err) {
    console.error("ERROR:", err); 
    res.status(500).json(err);
  }
});

// READ
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE (toggle complete)
router.put("/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;