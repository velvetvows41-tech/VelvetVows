const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');
const { protect } = require('../middleware/auth');

// @desc    Get Stats numbers
// @route   GET /api/stats
// @access  Public
router.get('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      // Return default values if not seeded yet
      stats = {
        yearsOfGrace: '2+',
        eventsCrafted: '150+',
        happyClients: '99%',
        citiesServed: '12+'
      };
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

// @desc    Update Stats numbers
// @route   POST /api/stats
// @access  Private
router.post('/', protect, async (req, res) => {
  const { yearsOfGrace, eventsCrafted, happyClients, citiesServed } = req.body;
  try {
    let stats = await Stats.findOne();
    if (stats) {
      stats.yearsOfGrace = yearsOfGrace !== undefined ? yearsOfGrace : stats.yearsOfGrace;
      stats.eventsCrafted = eventsCrafted !== undefined ? eventsCrafted : stats.eventsCrafted;
      stats.happyClients = happyClients !== undefined ? happyClients : stats.happyClients;
      stats.citiesServed = citiesServed !== undefined ? citiesServed : stats.citiesServed;
      await stats.save();
    } else {
      stats = new Stats({
        yearsOfGrace,
        eventsCrafted,
        happyClients,
        citiesServed
      });
      await stats.save();
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error saving stats' });
  }
});

module.exports = router;
