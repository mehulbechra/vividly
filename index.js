/* eslint-disable no-console */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

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

// Start server
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
