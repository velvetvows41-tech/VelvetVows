const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { protect } = require('../middleware/auth');

// @desc    Get YouTube video URL
// @route   GET /api/video
// @access  Public
router.get('/', async (req, res) => {
  try {
    const video = await Video.findOne();
    res.json({ url: video ? video.url : '' });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching video URL' });
  }
});

// @desc    Save/Update YouTube video URL
// @route   POST /api/video
// @access  Private
router.post('/', protect, async (req, res) => {
  const { url } = req.body;
  try {
    let video = await Video.findOne();
    if (video) {
      video.url = url;
      await video.save();
    } else {
      video = new Video({ url });
      await video.save();
    }
    res.json({ url: video.url });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving video URL' });
  }
});

module.exports = router;
