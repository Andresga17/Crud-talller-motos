const express = require('express');
const userRouter = require('./routes/user.routes');
const repairRouter = require('./routes/repair.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

module.exports = app;
