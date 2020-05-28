const { check } = require('express-validator');
const HTTPValidation = {};

HTTPValidation.Create = [
  check('name').exists().withMessage('Customer should have a name.'),
];

module.exports = HTTPValidation;