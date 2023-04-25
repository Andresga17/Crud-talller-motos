const catchAsync = require('../../API_BLOG1/blog_api_gen_22/utils/catchAsync');
const generateJWT = require('../../API_BLOG1/blog_api_gen_22/utils/jwt');
const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.findAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    include: [
      {
        model: Repair,
        attributes: { exclude: ['userId'] },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    messege: 'The query has been done successfully',
    results: users.length,
    users,
  });
});

exports.createUsers = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },

    include: [
      {
        model: Repair,
        attributes: { exclude: ['userId'] },
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    message: 'The query has been done successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

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
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const userDeleted = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  await userDeleted.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
    userDeleted,
  });
});
