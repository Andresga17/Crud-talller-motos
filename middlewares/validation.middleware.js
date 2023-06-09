const { body, validationResult } = require('express-validator');

//VALIDACION DE PROPIEDADES

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage('password cannot be empty')
    .withMessage('password must be at least 8 characters and maximum 20'),
  validateFields,
];

exports.updateUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validateFields,
];

exports.createAppointmentValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Type date in a valid format AAAA/MM/DD'),
  validateFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('The password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password mus be at least 8 characters long'),
  validateFields,
];

/**
 * Los campos que se deben validar son lo que traen informacion
 * que envia el cliente
 */
