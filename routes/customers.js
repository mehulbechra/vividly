const express = require('express');
const helpers = require('./../lib/helpers');
const _data = require('./../lib/database');

const router = express();

router.get('/', async (req, res) => {
  const customers = await _data.getAllCustomers();
  res.send(customers);
});

router.post('/', async (req, res) => {
  // Check name
  const { error } = helpers.validateCustomer(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });

  const customer = await _data.createCustomer(req.body.name, req.body.isGold, req.body.phone);
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  // Validate
  const { error } = helpers.validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Try to update
  const customer = await _data.updateCustomer(req.params.id, req.body.name, req.body.isGold, req.body.phone);

  // If not found - 404
  if (!customer) return res.status(404).send({ Error: 'The customer with the given id was not found' });

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  // Try to delete
  const customer = await _data.removeCustomer(req.params.id);

  // If not found - 404
  if (!customer) return res.status(404).send({ Error: 'The customer with the given id was not found' });

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await _data.getCustomer(req.params.id);

  // If not found - 404
  if (!customer) return res.status(404).send({ Error: 'The customer with the given id was not found' });

  res.send(customer);
});

module.exports = router;
