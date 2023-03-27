const express = require('express');
const repairController = require('./../controllers/repair.controller');

const router = express.Router(); //OJO nombre de la constante igual, por si algun error

router
  .route('/')
  .get(repairController.findPendingRepairs)
  .post(repairController.createAppointment);

router
  .route('/:id')
  .get(repairController.findOneRepair)
  .patch(repairController.updateRepairStatus)
  .delete(repairController.cancellRepair);

module.exports = router;
