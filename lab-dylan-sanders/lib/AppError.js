const AppError = module.exports = exports = function(message, statusCode, response) {
  this.message = message;
  this.statusCode = statusCode
  this.response = response;
};
