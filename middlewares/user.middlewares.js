const User = require('../models/user.model');

exports.validIfUserExist = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with id: ${id} not found`,
    });
  }

  req.user = user;
  next();
};
