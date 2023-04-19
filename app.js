const express = require('express');
const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repair.routes');
const AppError = require('./utils/appError');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
  );
});

module.exports = app;
