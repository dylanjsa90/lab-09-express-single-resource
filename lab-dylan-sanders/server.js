'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const musicRouter = require('./route/music_router');
const debug = require('debug');
const serverErrLog = debug('server:error');
const appError = require('./lib/AppError');
const port = 3000;

const app = module.exports = exports = express();

app.use(bodyParser.json());
app.use('/api/music', musicRouter);

app.post('/:id', bodyParser.json(), (req, res) => {
  // serverErrLog(req.body);
  // res.send('from the body parser\n');
});

app.use((err, req, res, next) => {
  if (err.type === 'AppError') return next(err);
  appError(500, 'internal server error', next)(err);
});

app.use((err, req, res, next) => {
  serverErrLog(err.error.message);
  res.status(err.statusCode || 500).json({msg: err.message});
});



app.listen(port, () => { console.log('server up on port 3000'); });
