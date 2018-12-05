// Dependencies
const { Customer } = require('../model/customer');
const { Genre } = require('../model/genre');

// Container
const lib = {};

/* ----------------- Genre ------------------ */

// Get all genres
lib.getAllGenre = async () => {
  try {
    const genres = await Genre.find();
    return genres;
  } catch (ex) {
    console.log('Could not get all genre');
  }
};

// Create a new genre
lib.createGenre = async (name) => {
  try {
    let genre = new Genre({ name });
    genre = await genre.save();
    return genre;
  } catch (ex) {
    console.log('Creating genre in database failed');
  }
};

// Update genre
lib.updateGenre = async (id, name) => {
  try {
    const genre = await Genre.findOneAndUpdate(id, { name }, { new: true, useFindAndModify: false });
    return genre;
  } catch (ex) {
    console.log('Could not update genre');
  }
};

// Remove a genre
lib.removeGenre = async (id) => {
  try {
    const genre = await Genre.findByIdAndRemove(id);
    return genre;
  } catch (ex) {
    console.log('Could not delete the genre');
  }
};

// Retrieve a single genre
lib.getGenre = async (id) => {
  try {
    const genre = await Genre.findById(id);
    return genre;
  } catch (ex) {
    console.log('Could not get the genre');
  }
};

/* ----------------- Customers ------------------ */



// Get all customers
lib.getAllCustomers = async () => {
  try {
    const customers = await Customer.find();
    return customers;
  } catch (ex) {
    console.log('Could not get all customers');
  }
};

// Create a new customer
lib.createCustomer = async (name, isGold, phone) => {
  try {
    let customer = new Customer({ name, isGold, phone });
    customer = await customer.save();
    return customer;
  } catch (ex) {
    console.log('Creating customer in database failed');
  }
};

// Update customer
lib.updateCustomer = async (id, name, isGold, phone) => {
  try {
    const customer = await Customer.findOneAndUpdate(id, { name, isGold, phone }, { new: true, useFindAndModify: false });
    return customer;
  } catch (ex) {
    console.log('Could not update customer');
  }
};

// Remove a customer
lib.removeCustomer = async (id) => {
  try {
    const customer = await Customer.findByIdAndRemove(id);
    return customer;
  } catch (ex) {
    console.log('Could not delete the customer');
  }
};

// Retrieve a single customer
lib.getCustomer = async (id) => {
  try {
    const customer = await Customer.findById(id);
    return customer;
  } catch (ex) {
    console.log('Could not get the customer');
  }
};

module.exports = lib;
