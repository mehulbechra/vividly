const express = require('express');
const _ = require('lodash');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');

const router = express();

router.post('/', async (req, res) => {
  // Check name
  const { error } = helpers.validateUser(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  let user = await _data.findUserByEmail(req.body.email);
  if (user) return res.status(400).send('User already registered');

  user = await _data.createUser(req.body.name, req.body.email, req.body.password);
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
