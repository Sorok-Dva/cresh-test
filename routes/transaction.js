const { Transaction } = require('../components');
const { HTTPValidation } = require('../middlewares');
const express = require('express');

const router = express.Router();

router
  .post('/', HTTPValidation.Transaction.Create, Transaction.Create)
  .get('/:id(\\d+)/instalments', Transaction.GetInstalments)
  .put('/:id(\\d+)/instalments', Transaction.TriggerInstalments);

module.exports = router;