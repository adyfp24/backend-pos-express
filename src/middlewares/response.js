const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const createdResponse = (res, data, message = 'Created', statusCode = 201) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const clientErrorResponse = (res, message = 'Bad Request', statusCode = 400) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

const notFoundResponse = (res, message = 'Not Found', statusCode = 404) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

const errorResponse = (res, error, message = 'Internal Server Error', statusCode = 500) => {
  console.error(error);
  res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error
  });
};

module.exports = {
  successResponse,
  createdResponse,
  clientErrorResponse,
  notFoundResponse,
  errorResponse
};
