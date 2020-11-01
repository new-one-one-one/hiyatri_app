const { check } = require('express-validator');

exports.create_booking_validator = [
      check('user_id')
      .not()
      .isEmpty()
      .withMessage('User id is required'),

      check('pnr_number')
      .not()
      .isEmpty()
      .withMessage('PNR number is required'),

      check('booking_information.is_arrival')
      .not()
      .isEmpty()
      .withMessage('Is arrival is required'),

      check('passenger_contact_information.primary_contact_number')
      .not()
      .isEmpty()
      .withMessage('Primary contact number is required'),

];
