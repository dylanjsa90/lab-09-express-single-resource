'use strict';

const Router = require('express').Router;
const Music = require('../model/Music');
const AppError = require('../lib/AppError');

const musicRouter = module.exports = exports = Router();
const music = {};

musicRouter.get('/:id', (req, res) => {
  let song = music[req.params.id];
  // Need test and error here
  return res.json(song);
});


musicRouter.get('/all', (req, res) => {
  let musicCollection = Object.keys(music).map((id) => {
    return music[id];
  });
  res.json(musicCollection);
});

musicRouter.post('/', (req, res) => {
  if(req.body.artist && req.body.song) {
    let song = new Music(req.body.artist, req.body.song);
    music[song.id] = song;
    return res.json(song);
  } else {
    res.sendError(new AppError(400, 'Bad request'));
  }
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

musicRouter.use((err, req, res, next) => {
  res.statusCode(err.statusCode || 500).send(err.message);
});
