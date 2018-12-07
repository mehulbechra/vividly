// Dependencies
const mongoose = require('mongoose');
const Fawn = require('fawn');
const bcrypt = require('bcrypt');

const { Customer } = require('../model/customer');
const { Genre } = require('../model/genre');
const { Movie } = require('../model/movies');
const { Rental } = require('../model/rentals');
const { User } = require('../model/users');

// Initialization
Fawn.init(mongoose);

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
    const genre = new Genre({ name });
    await genre.save();
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
    const customer = new Customer({ name, isGold, phone });
    await customer.save();
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

/* ----------------- Movies ------------------ */

// Get all Movies
lib.getAllMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (ex) {
    console.log('Could not get all movies');
  }
};

// Create a new Movie
lib.createMovie = async (title, genre, numberInStock, dailyRentalRate) => {
  try {
    const movie = new Movie({
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock,
      dailyRentalRate,
    });
    await movie.save();
    return movie;
  } catch (ex) {
    console.log('Creating movie in database failed', ex);
  }
};

// Update Movie
lib.updateMovie = async (id, title, genre, numberInStock, dailyRentalRate) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, {
      title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock,
      dailyRentalRate,
    }, { new: true, useFindAndModify: false });
    return movie;
  } catch (ex) {
    console.log('Could not update movie');
  }
};

// Remove a movie
lib.removeMovie = async (id) => {
  try {
    const movie = await Movie.findByIdAndRemove(id);
    return movie;
  } catch (ex) {
    console.log('Could not delete the movie');
  }
};

// Retrieve a single movie
lib.getMovie = async (id) => {
  try {
    const movie = await Movie.findById(id);
    return movie;
  } catch (ex) {
    console.log('Could not get the movie');
  }
};

/* ------------------- Rentals ----------------- */

// Get all Rentals
lib.getAllRentals = async () => {
  try {
    const rentals = await Rental.find();
    return rentals;
  } catch (ex) {
    console.log('Could not get all rentals');
  }
};

// Create a new Rental
lib.createRental = async (customer, movie) => {
  try {
    const rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });

    try {
      new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } }).run();
      return rental;
    } catch (ex) {
      console.log(ex);
    }
  } catch (ex) {
    console.log('Creating rental in database failed', ex);
  }
};

/* ---------------------- User ---------------------- */

lib.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

lib.createUser = async (name, email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  } catch (ex) {
    console.log('Creating user failed');
  }
};

/* ------------------------ Auth -------------------- */
lib.checkPassword = async (password, hashedPassword) => {
  try {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    return validPassword;
  } catch (ex) {
    console.log('Error verifying password');
  }
};

module.exports = lib;
