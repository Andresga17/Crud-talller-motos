class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //Llamando al constructor de la clase error
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.construtor);
  }
}

module.exports = AppError;
