const AppError = require('./AppError');
const debug = require('debug');
const errorLog = debug('errorLog');

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(err) {
      errorLog('error ' + err.statusCode + ' msg: ' + err.responseMessage);
      if (AppError.isAppError(err)) {
        return res.status(err.statusCode).send(err.responseMessage);
      } else {
        return res.status(500).send(err.message);
      }
    };
    next();
  };
};
