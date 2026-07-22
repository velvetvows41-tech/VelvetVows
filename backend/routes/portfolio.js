const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/auth');

// @desc    Get all portfolios
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching portfolios' });
  }
});

// @desc    Add a portfolio
// @route   POST /api/portfolio
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, category, description, src, ctaText, ctaLink } = req.body;
  if (!title || !description || !src) {
    return res.status(400).json({ message: 'Please provide title, description, and image' });
  }

  try {
    const portfolio = new Portfolio({
      title,
      category: category || 'Theme Curation',
      description,
      src,
      ctaText: ctaText || 'Consult on Design',
      ctaLink: ctaLink || '/contact'
    });

    const saved = await portfolio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding portfolio' });
  }
});

// @desc    Update a portfolio
// @route   PUT /api/portfolio/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { title, category, description, src, ctaText, ctaLink } = req.body;

  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    if (title) portfolio.title = title;
    if (category) portfolio.category = category;
    if (description) portfolio.description = description;
    if (src) portfolio.src = src;
    if (ctaText) portfolio.ctaText = ctaText;
    if (ctaLink) portfolio.ctaLink = ctaLink;

    const updated = await portfolio.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating portfolio' });
  }
});

// @desc    Delete a portfolio
// @route   DELETE /api/portfolio/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    await Portfolio.deleteOne({ _id: req.params.id });
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting portfolio' });
  }
});

module.exports = router;
