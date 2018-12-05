// Dependencies
const mongoose = require('mongoose');

// Creating Model for Genre
const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
}));

// Export the module
module.exports.Genre = Genre;
