'use strict';

const express = require('express');
const musicRouter = require('./route/music_router');
const port = 3000;

const app = module.exports = exports = express();

app.use('/api/music', musicRouter);

// app.post('/:id', bodyParser.json(), (req, res) => {
//   serverLog(req.body);
//   res.send('from the body parser\n');
// });
//
// app.use((err, req, res, next) => {
//   serverErrLog(err.error.message);
//   let error = new AppError(err.message, err.statusCode, err.responseMessage);
//   sendError(error, req, res, next);
// });

// app.use((err, req, res, next) => {
//   res.status(err.statusCode || 500).json({msg: err.message});
// });



app.listen(port, () => { console.log('server up on port 3000'); });
