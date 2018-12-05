// Dependencies
const mongoose = require('mongoose');

// Genre Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

// Creating Model for Genre
const Genre = mongoose.model('Genre', genreSchema);

// Export the module
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
