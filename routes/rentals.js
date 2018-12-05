const express = require('express');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');
const { Customer } = require('../model/customer');
const { Movie } = require('../model/movies');

const router = express();

router.get('/', async (req, res) => {
  const rentals = await _data.getAllRentals();
  res.send(rentals);
});

router.post('/', async (req, res) => {
  // Check name
  const { error } = helpers.validateRentals(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Wrong customer id');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Wrong movie id');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

  const rental = await _data.createRental(customer, movie);
  res.send(rental);
});

module.exports = router;
