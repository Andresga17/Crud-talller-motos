const express = require('express');

const repairController = require('./../controllers/repair.controller');

const repairMiddleware = require('./../middlewares/repair.middleware');
const validation = require('./../middlewares/validation.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');


const router = express.Router();

router.use(authMiddleware.protect)

router
  .route('/')
  .get(authMiddleware.restrictTo, repairController.findPendingRepairs)
  .post(
    validation.createAppointmentValidation,
    repairController.createAppointment
  );

router
  .route('/:id')
  .get(authMiddleware.restrictTo, repairMiddleware.validIfRepairExist, repairController.findOneRepair)
  .patch(
    authMiddleware.restrictTo,
    repairMiddleware.validIfRepairExist,
    repairController.updateRepairStatus
  )
  .delete(authMiddleware.restrictTo, repairMiddleware.validIfRepairExist, repairController.cancellRepair);

module.exports = router;
