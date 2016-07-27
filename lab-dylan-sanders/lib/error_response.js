// const AppError = require('./AppError');

module.exports = exports = function(req, res, next) {
  return res.sendError = function(error) {
    if (error instanceof 'AppError') {
      res.send(error.statusCode + ': ' + error.responseMessage);
    } else {
      error.statusCode = 500;
      error.responseMessage = 'Internal server error';
      res.send(error.statusCode + ': ' + error.responseMessage);
    }
  };
};
