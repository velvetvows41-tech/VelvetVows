const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');

// @desc    Get all testimonials
// @route   GET /api/testimonial
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching testimonials' });
  }
});

// @desc    Add a testimonial
// @route   POST /api/testimonial
// @access  Private
router.post('/', protect, async (req, res) => {
  const { couple, text } = req.body;
  if (!couple || !text) {
    return res.status(400).json({ message: 'Please provide couple name and review text' });
  }

  try {
    const testimonial = new Testimonial({ couple, text });
    const saved = await testimonial.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding testimonial' });
  }
});

// @desc    Update a testimonial
// @route   PUT /api/testimonial/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { couple, text } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (couple) testimonial.couple = couple;
    if (text) testimonial.text = text;

    const updated = await testimonial.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating testimonial' });
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonial/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting testimonial' });
  }
});

module.exports = router;
