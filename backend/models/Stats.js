const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  yearsOfGrace: {
    type: String,
    default: '2+',
  },
  eventsCrafted: {
    type: String,
    default: '150+',
  },
  happyClients: {
    type: String,
    default: '99%',
  },
  citiesServed: {
    type: String,
    default: '12+',
  },
}, { timestamps: true });

module.exports = mongoose.model('Stats', StatsSchema);
