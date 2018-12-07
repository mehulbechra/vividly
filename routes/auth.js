const express = require('express');
const jwt = require('jsonwebtoken');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');

const router = express();

router.post('/', async (req, res) => {
  // Check name
  const { error } = helpers.validateAuth(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const user = await _data.findUserByEmail(req.body.email);
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await _data.checkPassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
  res.send(token);
});
}

module.exports = router;
