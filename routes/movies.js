const express = require('express');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');
const { Genre } = require('../model/genre');

const router = express();

router.get('/', async (req, res) => {
  const movies = await _data.getAllMovies();
  res.send(movies);
});

router.post('/', async (req, res) => {
  // Validate Input
  const { error } = helpers.validateMovie(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre');

  const movie = await _data.createMovie(req.body.title, genre, req.body.numberInStock, req.body.dailyRentalRate);
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  // Validate
  const { error } = helpers.validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre');

  // Try to update
  const movie = await _data.updateMovie(req.params.id, req.body.title, genre, req.body.numberInStock, req.body.dailyRentalRate);

  // If not found - 404
  if (!movie) return res.status(404).send({ Error: 'The movie with the given id was not found' });

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  // Try to delete
  const movie = await _data.removeMovie(req.params.id);

  // If not found - 404
  if (!movie) return res.status(404).send({ Error: 'The movie with the given id was not found' });

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await _data.getMovie(req.params.id);

  // If not found - 404
  if (!movie) return res.status(404).send({ Error: 'The movie with the given id was not found' });

  res.send(movie);
});

module.exports = router;
