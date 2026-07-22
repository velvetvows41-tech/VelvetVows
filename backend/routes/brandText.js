const express = require('express');
const router = express.Router();
const BrandText = require('../models/BrandText');
const { protect } = require('../middleware/auth');

// @desc    Get all brand texts
// @route   GET /api/brand-text
// @access  Public
router.get('/', async (req, res) => {
  try {
    let brandText = await BrandText.findOne();
    if (!brandText) {
      // Create defaults if not present
      brandText = new BrandText();
      await brandText.save();
    }
    res.json(brandText);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching brand text' });
  }
});

// @desc    Update brand texts
// @route   POST /api/brand-text
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    let brandText = await BrandText.findOne();
    if (!brandText) {
      brandText = new BrandText(req.body);
    } else {
      // Update all keys from body
      Object.assign(brandText, req.body);
    }
    await brandText.save();
    res.json(brandText);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating brand text' });
  }
});

module.exports = router;
