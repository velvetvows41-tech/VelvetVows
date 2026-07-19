const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Item = require('../models/Item');
const { protect } = require('../middleware/auth');

// Helper to save base64 string as file and return static path (Always store base64 in MongoDB for full serverless consistency)
function saveBase64Image(base64Str) {
  return base64Str;
}

// @desc    Get items, optionally filtered by type
// @route   GET /api/items
// @access  Public
router.get('/', async (req, res) => {
  const { type } = req.query;
  try {
    const filter = type ? { type } : {};
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching items' });
  }
});

// @desc    Publish/Add new items
// @route   POST /api/items
// @access  Private
router.post('/', protect, async (req, res) => {
  const { type, images } = req.body;

  if (!type || !Array.isArray(images)) {
    return res.status(400).json({ message: 'Please provide type and an array of images' });
  }

  try {
    const savedItems = [];
    for (const img of images) {
      let srcPath = img.src;
      // If it is a base64 string, decode and save as a real file
      if (img.src && img.src.startsWith('data:') && img.src.includes(';base64,')) {
        const savedPath = saveBase64Image(img.src);
        if (savedPath) {
          srcPath = savedPath;
        } else {
          // If we fail to save the file, throw an error to prevent DB corruption with huge base64 strings
          throw new Error('Failed to save uploaded image file');
        }
      }

      const newItem = new Item({
        id: img.id,
        type,
        src: srcPath,
        label: img.label || '',
      });

      const saved = await newItem.save();
      savedItems.push(saved);
    }
    res.status(201).json(savedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving items' });
  }
});

// @desc    Update item label
// @route   PUT /api/items/:id/label
// @access  Private
router.put('/:id/label', protect, async (req, res) => {
  const { label } = req.body;
  try {
    const item = await Item.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.label = label;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating label' });
  }
});

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Try to delete the physical file if it exists in uploads directory
    if (item.src.startsWith('/uploads/')) {
      const filepath = path.join(__dirname, '..', item.src);
      try {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      } catch (err) {
        console.warn('Unable to delete physical file (possibly running on serverless Vercel):', err.message);
      }
    }

    await Item.deleteOne({ id: req.params.id });
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting item' });
  }
});

// @desc    Clear all items of a type
// @route   DELETE /api/items
// @access  Private
router.delete('/', protect, async (req, res) => {
  const { type } = req.query;
  if (!type) {
    return res.status(400).json({ message: 'Please specify the type to clear' });
  }
  try {
    const items = await Item.find({ type });
    for (const item of items) {
      if (item.src.startsWith('/uploads/')) {
        const filepath = path.join(__dirname, '..', item.src);
        try {
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        } catch (err) {
          console.warn('Unable to delete physical file (possibly running on serverless Vercel):', err.message);
        }
      }
    }
    await Item.deleteMany({ type });
    res.json({ message: `All ${type} items cleared` });
  } catch (error) {
    res.status(500).json({ message: 'Server error clearing items' });
  }
});

module.exports = router;
