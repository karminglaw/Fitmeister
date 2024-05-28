const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    maxlength: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('journey', JourneySchema);
