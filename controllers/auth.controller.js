const catchAsync = require('../../API_BLOG1/blog_api_gen_22/utils/catchAsync');
const generateJWT = require('../../API_BLOG1/blog_api_gen_22/utils/jwt');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const bcrypt = require('bcrypt');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('The user could not found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
