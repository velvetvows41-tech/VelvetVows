const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['hero', 'gallery', 'services'],
  },
  src: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
