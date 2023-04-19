const AppError = require('../utils/appError');

const handleCastError22P02 = () =>
  new AppError('Some type of data send does not match was expected', 400);

const handleJWTExpireError = () => {
  new AppError('Your tokem has expired! plase login again.', 401);
};

handleJWTError = () => new AppError('Invalid token. Please login again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error', err);
    res.status(500).json({
      status: 'fail',
      message: 'Somthing went very wrong',
    });
  }
};

const globalErrorHandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(error.parent?.code);
    if (!error.parent?.code) {
      error = err;
    }

    if (error.parent?.code === '22P02') error = handleCastError22P02(error);
    if (error.name === 'TokenExpiredError') error = handleJWTExpireError();
    if (error.name === 'JsonWebTokenError') error = handleJWTError;

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandle;
