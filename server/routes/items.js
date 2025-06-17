const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create item
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
