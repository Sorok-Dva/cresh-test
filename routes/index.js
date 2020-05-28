const express = require('express');

const miscRouter = require('./misc');
const customers = require('./customer');
const transactions = require('./transaction');

const router = express.Router();

router.use('/', miscRouter);
router.use('/customers', customers);
router.use('/transactions', transactions);

module.exports = router;