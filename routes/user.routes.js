const express = require('express');

const userController = require('./../controllers/user.controller');

const userMiddleware = require('./../middlewares/user.middlewares')
const validation = require('./../middlewares/validation.middleware')

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(validation.createUserValidation, userController.createUsers);

router
  .route('/:id')
  .get(userMiddleware.validIfUserExist, userController.findOneUser)
  .patch(validation.updateUserValidation, userMiddleware.validIfUserExist, userController.updateUser)
  .delete(userMiddleware.validIfUserExist, userController.deleteUser);

module.exports = router;
