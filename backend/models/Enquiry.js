const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  eventDate: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  guestCount: {
    type: Number,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', EnquirySchema);
