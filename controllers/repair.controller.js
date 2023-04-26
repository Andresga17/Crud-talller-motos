const catchAsync = require('./../utils/catchAsync');
const Repair = require('../models/repair.model');
const User = require('../models/user.model');

exports.findPendingRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    results: repairs.length,
    repairs,
  });
});

exports.createAppointment = catchAsync(async (req, res) => {
  const { date, userId, motorsNumber, description } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  res.status(200).json({
    status: 'success',
    message: 'The Appointment has been created',
    repair,
  });
});
exports.findOneRepair = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },

    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  res.status(200).json({
    status: 'succes',
    message: 'The query has been done successfully',
    repair,
  });
});

exports.updateRepairStatus = catchAsync(async (req, res) => {
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
});

exports.cancellRepair = catchAsync(async (req, res) => {
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
});
