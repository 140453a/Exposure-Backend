const mongoose = require('mongoose');
var random = require('mongoose-simple-random');


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
  exposure_EV: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// This is to get mongoose-simple-random to work
PhotoSchema.plugin(random);


module.exports = mongoose.model('Photos', PhotoSchema);
