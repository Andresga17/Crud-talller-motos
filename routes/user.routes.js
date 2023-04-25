const express = require('express');

const userController = require('./../controllers/user.controller');

const loginController = require('./../controllers/auth.controller');

const userMiddleware = require('./../middlewares/user.middlewares');
const validation = require('./../middlewares/validation.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/login')
  .post(validation.loginUserValidation, loginController.login);

router
  .route('/')
  .post(validation.createUserValidation, userController.createUsers);

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), userController.findAllUsers);

router
  .route('/:id')
  .get(userMiddleware.validIfUserExist, userController.findOneUser)
  .patch(
    userMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userController.updateUser,
    validation.updateUserValidation
  )
  .delete(
    userMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
