const Repair = require('../models/repair.model');

exports.validIfRepairExist = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending' || 'completed',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repair with id: ${id} not found`,
    });
  }

  req.repair = repair;
  next();
};
