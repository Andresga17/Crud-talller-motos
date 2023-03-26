const express = require('express');
const userRouter = require('./routes/user.routes')

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter)

module.exports = app;
