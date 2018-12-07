/* eslint-disable no-console */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// Connecting to databse
mongoose.connect('mongodb://localhost/Vividly')
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Could not connect to MongoDb'));

// Initializing express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Start server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
