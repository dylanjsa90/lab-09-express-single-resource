'use strict';

let AppError = module.exports = exports = function(error, statusCode, message) {
  this.error = error;
  this.message = message;
  this.statusCode = statusCode;
};

AppError.prototype.message = function() {
  if (this.statusCode === 400) {
    return 'bad request';
  } else if (this.statusCode === 404) {
    return 'Error, not found';
  } else {
    return 'Internal server error';
  }
};

// let appError = module.exports = exports = function(err, statusCode, message) {
//   return Object.create({err, statusCode, message});
// };


// let appError = module.exports = exports = function(statusCode, message, errCb) {
//   return function(error) {
//     errCb({error, statusCode, message, type: 'AppError'});
//   };
// };
