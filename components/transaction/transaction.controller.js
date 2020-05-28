const __ = process.cwd();
const { validationResult } = require('express-validator');
const { BackError } = require(`${__}/helpers/back.error`);
const _ = require('lodash');
const moment = require('moment');
const httpStatus = require('http-status');
const Models = require(`${__}/sequelize/models/index`);

const Transaction = {};

/**
 * Create a Transaction
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Transaction.Create = (req, res, next) => {
  const errors = validationResult(req);
  let { store_name, amount, split, user_id: customer_id } = req.body;
  let instalments = [];

  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).send({ body: req.body, errors: errors.array() });
  }

  Models.Transaction.create({ store_name, amount, split, customer_id }).then(transaction => {
    return transaction;
  }).then(transaction => {
    if (transaction) {
      for (let i = 0; i < split; i++) {
        let instalment = {
          transaction_id: transaction.id,
          amount: (transaction.amount / split).toFixed(0),
          is_paid: i < 1,
          planned_date: moment().add(i, 'month'),
          paid_date: i < 1 ? new Date() : null
        };
        instalments.push(instalment);
        Models.Instalment.create(instalment);
      }
    }

    return res.status(201).send({ created: !!transaction, transaction, instalments });
  }).catch(error => next(new BackError(error)));
};

/**
 * Get all instalments for specific Transaction
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Transaction.GetInstalments = (req, res, next) => {
  let { id } = req.params;

  Models.Transaction.findOne({
    where: { id },
    include: {
      model: Models.Instalment,
      as: 'instalments'
    }
  }).then(transaction => {
    if (_.isNil(transaction)) return next(new BackError('Transaction not found.', 404));
    return res.status(200).send(transaction.instalments);
  }).catch(error => next(new BackError(error)));
};

/**
 * Trigger the payment of the transaction's next instalment
 * @param req
 * @param res
 * @param next
 * @returns res.send
 */
Transaction.TriggerInstalments = (req, res, next) => {
  let { id } = req.params;

  Models.Transaction.findOne({
    where: { id },
    include: {
      model: Models.Instalment,
      as: 'instalments',
      required: false,
      where: {
        is_paid: false
      },
    }
  }).then(transaction => {
    if (_.isNil(transaction)) return next(new BackError('Transaction not found', 404));
    if (transaction.instalments.length < 1) {
      if (!transaction.is_completed)
        transaction.update({ is_completed: true }).then((updatedRow) => {
          return res.status(200).send({ transaction: updatedRow });
        });
      return res.status(200).send({ transaction });
    } else {
      transaction.instalments[0].update({ is_paid: true, paid_date: new Date() }).then(updatedRow => {
        return res.status(200).send({ transaction, updatedRow });
      });
    }

  }).catch(error => next(new BackError(error)));
};

module.exports = Transaction;
