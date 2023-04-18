const Repair = require('../models/repair.model');

exports.findPendingRepairs = async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  res.status(200).json({
    status: 'success',
    message:
      'The query has been done successfully',
    results: repairs.length,
    repairs,
  });
};

exports.createAppointment = async (req, res) => {
  const { date, userId } = req.body;

  const repair = await Repair.create({
    date,
    userId,
  });

  res.status(200).json({
    status: 'success',
    message: 'The Appointment has been created',
    repair,
  });
};

exports.findOneRepair = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  res.status(200).json({
    status: 'succes',
    message:
      'The query has been done successfully',
    repair,
  });
};

exports.updateRepairStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const repairUpdated = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  await repairUpdated.update({
    status: status,
  });

  res.status(200).json({
    status: 'success',
    message: 'The reapir has been completed',
    repairUpdated,
  });
};

exports.cancellRepair = async (req, res) => {
  const { id } = req.params;

  const repairCancelled = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  await repairCancelled.update({
    status: 'cancelled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The repair has been cancelled',
    repairCancelled,
  });
};
