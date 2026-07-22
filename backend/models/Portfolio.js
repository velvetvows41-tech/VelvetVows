const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Theme Curation',
  },
  description: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  ctaText: {
    type: String,
    default: 'Consult on Design',
  },
  ctaLink: {
    type: String,
    default: '/contact',
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
