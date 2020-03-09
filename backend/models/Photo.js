const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  photoid: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  exposure_type: {
      type: String,
      required: true
  },
  exposure_time: {
    type: String,
    required: true
  },
  exposure_fstop: {
    type: String,
    required: true
  },
  exposure_ISO: {
    type: String,
    required: true
  },
  exposure_flength: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Photos', PhotoSchema);
