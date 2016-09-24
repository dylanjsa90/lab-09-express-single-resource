'use strict';

const app = require('express')();
const musicRouter = require('./route/music_router');
const AppError = require('./lib/AppError');
const errorResponse = require('./lib/error_response');
const debug = require('debug');
const serverLog = debug('server:Log');

const morgan = require('morgan');
const port = 3000;

app.use(errorResponse());
app.use(morgan('dev'));
app.use('/api/music', musicRouter);

app.use((req, res) => {
  serverLog('error');
  res.sendError(AppError.badRequest());
});



app.listen(port, () => console.log('server up on port 3000'));
