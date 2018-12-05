// Dependencies
const mongoose = require('mongoose');

// Creating Model for Customers
const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
  },
}));

// Export the module
module.exports.Customer = Customer;
