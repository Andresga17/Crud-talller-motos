const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    messege:
      'The query has been done successfully',
    results: users.length,
    users,
  });
};

exports.createUsers = async (req, res) => {
  const { name, email, password, role } =
    req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created',
    user,
  });
};

exports.findOneUser = async (req, res) => {
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
      message: `Product with id: ${id} not found`,
    });
  }

  res.status(200).json({
    status: 'success',
    message:
      'The query has been done successfully',
    user,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const { name, email } = req.body;

  const userUpdated = await User.findOne({
    where: {
      id,
    },
  });

  await userUpdated.update({
    name: name,
    email: email,
  });

  res.status(200).json({
    status: 'succes',
    message: 'The user has been updated',
    userUpdated,
  });
};

exports.deleteUser = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const userDeleted = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  await userDeleted.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
    userDeleted
  });
};
