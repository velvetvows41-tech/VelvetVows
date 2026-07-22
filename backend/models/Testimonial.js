const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  couple: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
