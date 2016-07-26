'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const musicRouter = require('./route/music_router');
const port = 3000;

const server = module.exports = exports = express();

server.use(bodyParser.json());
server.use('/api/music', musicRouter);
server.listen(port, () => { console.log('server up on port 3000'); });
