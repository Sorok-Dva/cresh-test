const { check } = require('express-validator');
const HTTPValidation = {};

/**
 * HTTPValidation: Customer.Create Method
 * Checks: @Name exists
 * @type {ValidationChain[]}
 */
HTTPValidation.Create = [
  check('name').exists().withMessage('Customer should have a name.'),
];

module.exports = HTTPValidation;