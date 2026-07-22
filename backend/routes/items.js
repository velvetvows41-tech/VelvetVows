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

const defaultDescriptions = {
  "wedding planning": "From layout designing and budget tracking to vendor agreements, we shape your dream celebration from the ground up with absolute detail and care.",
  "wedding curation": "From architectural floor plans and visual curation to custom vendor agreements, we design your milestone celebrations with meticulous attention to detail.",
  "social & corporate events": "Bespoke styling and execution for high-profile social galas, birthdays, anniversaries, and corporate events with luxury hospitality and soundscapes.",
  "social & corporate galas": "Bespoke spatial design and execution for high-profile anniversaries, luxury birthdays, and corporate galas with premium hospitality.",
  "hospitality desk management": "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, room itinerary bags, and personal host supports at the hotel.",
  "hospitality desk curation": "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, custom itinerary bags, and personal host supports.",
  "guest coordination": "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
  "guest curation & rsvp logs": "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
  "venue & decor management": "Scouting heritage palaces and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
  "venue & spatial design": "Scouting historic heritage locations and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
  "guest transportation support": "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests.",
  "guest logistics support": "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests."
};

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

      const labelKey = (img.label || '').toLowerCase().trim();
      const defaultDesc = type === 'services' ? (defaultDescriptions[labelKey] || 'Custom curated services designed and executed by our expert hospitality professionals.') : '';

      const newItem = new Item({
        id: img.id,
        type,
        src: srcPath,
        label: img.label || '',
        description: img.description || defaultDesc,
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

// @desc    Update item label and description
// @route   PUT /api/items/:id/label
// @access  Private
router.put('/:id/label', protect, async (req, res) => {
  const { label, description } = req.body;
  try {
    const item = await Item.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (label !== undefined) item.label = label;
    if (description !== undefined) item.description = description;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating label and description' });
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

    if (item.type === 'hero' && (item.id === '1784374660326-hero' || item.src.includes('img-1784374660326-382082045.jpg'))) {
      return res.status(403).json({ message: 'The default hero image cannot be deleted' });
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
      if (type === 'hero' && (item.id === '1784374660326-hero' || item.src.includes('img-1784374660326-382082045.jpg'))) {
        continue;
      }
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
    if (type === 'hero') {
      await Item.deleteMany({ type, id: { $ne: '1784374660326-hero' }, src: { $not: /img-1784374660326-382082045\.jpg/ } });
    } else {
      await Item.deleteMany({ type });
    }
    res.json({ message: `All ${type} items cleared` });
  } catch (error) {
    res.status(500).json({ message: 'Server error clearing items' });
  }
});

module.exports = router;
