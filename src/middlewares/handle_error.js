class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler  = (err, req, res, next) => {
  console.log(err);

  // Check if the error is a mongoose validation error
  if (err.name === 'CastError') {
    return res.status(404).send({ type: 'Ressource not found', message: err.message, statusCode: 404, success: false });
  }

  if (err.code === 11000) {
    return res.status(400).send({ type: 'Duplicate field value entered', message: err.message, statusCode: 400, success: false });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ type: 'ValidationError', message: err.message, statusCode: 400, success: false });
  }

  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    // Handle the error here
    return res.status(err.statusCode).send({ message: err.message, statusCode: err.statusCode, success: false });
  }
  
  // Send the error response
  return res.status(err.statusCode || 500)
    .send({message: err.message || 'Internal server error', statusCode: err.statusCode || 500, success: false});
};

module.exports = {errorHandler, AppError};