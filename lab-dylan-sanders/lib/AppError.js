'use strict';

let AppError = module.exports = exports = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode  = statusCode;
  this.responseMessage = responseMessage;
};

AppError.badRequest = function() {
  return new AppError('Bad Request', 400, 'Bad Request');
};

AppError.notFound = function() {
  return new AppError('Not Found', 404, 'Page Not Found');
};

AppError.serverError = function() {
  return new AppError('Server Error', 500, 'Internal Server Error');
};

AppError.isAppError = function(err) {
  return err instanceof AppError;
};
