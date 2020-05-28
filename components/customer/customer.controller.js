const __ = process.cwd();
const { validationResult } = require('express-validator');
const { BackError } = require(`${__}/helpers/back.error`);
const _ = require('lodash');
const httpStatus = require('http-status');
const Models = require(`${__}/sequelize/models/index`);

const Customer = {};

/**
 * Create a customer
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Customer.Create = (req, res, next) => {
  const errors = validationResult(req);
  let { name } = req.body;

  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({ body: req.body, errors: errors.array() });
  }

  Models.Customer.create({ name }).then(customer => {
    return res.status(201).send({ created: !!customer, customer });
  }).catch(error => next(new BackError(error)));
};

/**
 * Get all customers
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Customer.GetAll = (req, res, next) => {
  Models.Customer.findAll().then(customers => {
    return res.status(200).send(customers)
  }).catch(error => next(new BackError(error)));
};

/**
 * Get all transactions for a specific customer
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Customer.GetTransactions = (req, res, next) => {
  Models.Customer.findOne({
    where: { id: req.params.id },
    include: {
      model: Models.Transaction,
      as: 'transactions'
    }
  }).then(customer => {
    if (_.isNil(customer)) return next(new BackError(`Customer #${req.params.id} not found.`, 404));
    return res.status(200).send(customer.transactions)
  }).catch(error => next(new BackError(error)));
};

module.exports = Customer;