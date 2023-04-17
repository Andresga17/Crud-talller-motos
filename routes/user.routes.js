const express = require('express');

const userController = require('./../controllers/user.controller');

const userMiddleware = require('./../middlewares/user.middlewares')

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUsers);

router
  .route('/:id')
  .get(userMiddleware.validIfUserExist, userController.findOneUser)
  .patch(userMiddleware.validIfUserExist, userController.updateUser)
  .delete(userMiddleware.validIfUserExist, userController.deleteUser);

module.exports = router;
