const express = require('express');

const repairController = require('./../controllers/repair.controller');
const repairMiddleware = require('./../middlewares/repair.middleware')
const validation = require('./../middlewares/validation.middleware')

const router = express.Router();

router
  .route('/')
  .get(repairController.findPendingRepairs)
  .post(validation.createAppointmentValidation, repairController.createAppointment);

router
  .route('/:id')
  .get(repairMiddleware.validIfRepairExist, repairController.findOneRepair)
  .patch(repairMiddleware.validIfRepairExist, repairController.updateRepairStatus)
  .delete(repairMiddleware.validIfRepairExist, repairController.cancellRepair);

module.exports = router;
