const { Customer } = require('../components');
const { HTTPValidation } = require('../middlewares');
const express = require('express');

const router = express.Router();

router
  .get('/', Customer.GetAll)
  .post('/', HTTPValidation.Customer.Create, Customer.Create)
  .get('/:id(\\d+)/transactions', Customer.GetTransactions);

module.exports = router;