// Dependencies
const Joi = require('joi');

// Container for the helper
const lib = {};

lib.validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(genre, schema);
};

lib.validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
  }
  return Joi.validate(customer, schema);
};

// Export
module.exports = lib;
