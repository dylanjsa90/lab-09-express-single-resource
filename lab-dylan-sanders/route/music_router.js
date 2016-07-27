'use strict';

const express = require('express');
const musicRouter = express.Router();
const Music = require('../model/Music');
const AppError = require('../lib/AppError');
const sendError = require('../lib/error_response');
const bodyParser = require('body-parser');
const debug = require('debug');
const serverErrLog = debug('server:error');
const serverLog = debug('server:log');
const music = {};
const jsonParser = bodyParser.json();

musicRouter.get('/:id', (req, res) => {
  let song = music[req.params.id];
  // Need test and error here
  res.send(song);
});


musicRouter.get('/all', (req, res) => {
  let musicCollection = Object.keys(music).map((id) => {
    return music[id];
  });
  res.json(musicCollection);
});

musicRouter.post('/', jsonParser, (req, res) => {
  if(req.body.artist && req.body.song) {
    let song = new Music(req.body.artist, req.body.song);
    music[song.id] = song;
    res.json(song);
  } else {
    sendError(res.sendError(new AppError(400, 'Bad request')));
  }
});

musicRouter.post('/:id', jsonParser, (req, res, next) => {
  serverLog(req.body);
  if (music[req.body.id]) {

    res.send('from the body parser\n');
  }
});

musicRouter.use((err, req, res, next) => {
  let error = new AppError(err.message, err.statusCode, err.responseMessage);
  sendError(res.sendError(error));
  serverErrLog(err.error.message);
});

musicRouter.delete('/:id', (req, res, next) => {
  let songId = music[req.params.id];
  if (songId) {
    res.json(songId);
    delete music[songId];
  } else {
    next(new AppError(400, 'Error, not found'));
  }
});

module.exports = musicRouter;
