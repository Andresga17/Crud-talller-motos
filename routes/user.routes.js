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

router.route('/').get(userController.findAllUsers);

router
  .route('/:id')
  .get(userMiddleware.validIfUserExist, userController.findOneUser)
  .patch(
    validation.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userMiddleware.validIfUserExist,
    userController.updateUser
  )
  .delete(
    userMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
