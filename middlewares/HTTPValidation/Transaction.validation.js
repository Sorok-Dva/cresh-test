const { check } = require('express-validator');
const HTTPValidation = {};

/**
 * HTTPValidation: Transaction.Create Method
 * Checks:
 *      - @Store_name exists
 *      - @Amount is numeric
 *      - @Split is numeric
 *      - @User_id is numeric
 * @type {ValidationChain[]}
 */
HTTPValidation.Create = [
  check('store_name').exists().withMessage('Store Name cannot be empty.'),
  check('amount').isNumeric().withMessage('Amount should be numeric.'),
  check('split').isNumeric().withMessage('Split should be numeric.'),
  check('user_id').isNumeric().withMessage('User_id should be numeric.'),
];

module.exports = HTTPValidation;