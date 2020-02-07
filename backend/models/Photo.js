const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  photoid: {
    type: Integer,
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
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Photo', PhotoSchema);
