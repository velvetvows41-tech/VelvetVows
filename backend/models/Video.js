const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
