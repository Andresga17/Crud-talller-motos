const express = require('express');
const userController = require('./../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUsers);

router
  .route('/:id')
  .get(userController.findOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
