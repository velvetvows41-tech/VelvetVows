const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect } = require('../middleware/auth');

// @desc    Submit a new contact form enquiry
// @route   POST /api/enquiries
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    const saved = await newEnquiry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving enquiry' });
  }
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching enquiries' });
  }
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    await Enquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting enquiry' });
  }
});

module.exports = router;
