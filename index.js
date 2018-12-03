/* eslint-disable no-console */

const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'classic' },
  { id: 2, name: 'rock' },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  // Check name
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  // Create object and add to genres
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id, 10));

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });

  // Validate
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id, 10));

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id, 10));

  // If not found - 404
  if (!genre) return res.status(404).send({ Error: 'The genre with the given id was not found' });
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
