// Dependencies
const Joi = require('joi');

// Container for the helper
const lib = {};

// Logic for validating input for Genre
lib.validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(genre, schema);
};

// Logic for validating input for Customer
lib.validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().min(1000000000).max(9999999999).required(),
  };
  return Joi.validate(customer, schema);
};

// Logic for validating input for Movie
lib.validateMovie = (movie) => {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };
  return Joi.validate(movie, schema);
};

// Logic for validating input for Rentals
lib.validateRentals = (rental) => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  };
  return Joi.validate(rental, schema);
};

// Export
module.exports = lib;
