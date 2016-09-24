const AppError = require('./AppError');

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(err) {
      if (AppError.isAppError(err)) {
        return res.status(err.statusCode).send(err.responseMessage);
      } else {
        return res.status(500).send(err.message);
      }
    };
    next();
  };
};
