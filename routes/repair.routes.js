const express = require('express');

const repairController = require('./../controllers/repair.controller');

const repairMiddleware = require('./../middlewares/repair.middleware');
const validation = require('./../middlewares/validation.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(
    authMiddleware.restrictTo('employee'),
    repairController.findPendingRepairs
  )
  .post(
    validation.createAppointmentValidation,
    repairController.createAppointment
  );

router
  .route('/:id')
  .get(
    authMiddleware.restrictTo('employee'),
    repairController.findOneRepair,
    repairMiddleware.validIfRepairExist
  )
  .patch(
    authMiddleware.restrictTo('employee'),
    repairController.updateRepairStatus,
    repairMiddleware.validIfRepairExist
  )
  .delete(
    authMiddleware.restrictTo('employee'),
    repairController.cancellRepair,
    repairMiddleware.validIfRepairExist
  );

module.exports = router;
