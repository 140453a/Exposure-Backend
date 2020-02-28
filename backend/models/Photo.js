const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  photoid: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
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
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Photo', PhotoSchema);
