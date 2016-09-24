'use strict';
const AppError = require('./AppError');

module.exports = exports = function(statusCode, message) {
  statusCode = statusCode || 400;
  message = message || 'invalid json';
  return function(req, res, next) {
    let jsonError = AppError(statusCode, message, next);
    new Promise((resolve, reject) => {
      let jsonString = '';
      req.on('data', (data) => {
        jsonString = jsonString + data.toString();
      });

      req.on('end', () => {
        try {
          let parsed = JSON.parse(jsonString);
          resolve(parsed);
        } catch(err) {
          reject(err);
        }
      });
    })
    .then((json) => {
      req.body = json;
      next();
    }, jsonError);
  };
};
