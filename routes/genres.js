const express = require('express');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');

const router = express();

router.get('/', async (req, res) => {
  const genres = await _data.getAllGenre();
  res.send(genres);
});

router.post('/', async (req, res) => {
  // Check name
  const { error } = helpers.validateGenre(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const genre = await _data.createGenre(req.body.name);
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  // Validate
  const { error } = helpers.validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Try to update
  const genre = await _data.updateGenre(req.params.id,req.body.name);

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  // Try to delete
  const genre = await _data.removeGenre(req.params.id);

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await _data.getGenre(req.params.id);

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });

  res.send(genre);
});

module.exports = router;
