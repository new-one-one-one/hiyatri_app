const { check } = require('express-validator');

exports.authenticate_validator = [
      check('phone_number')
      .not()
      .isEmpty()
      .withMessage('Phone number is required'),
];
