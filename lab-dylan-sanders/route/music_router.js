'use strict';

const express = require('express');
const musicRouter = express.Router();
const Music = require('../model/Music');
const AppError = require('../lib/AppError');
const jsonParser = require('body-parser').json();
const debug = require('debug');
const serverLog = debug('serverLog');

const music = {};

musicRouter.get('/:id', (req, res) => {
  serverLog('get music id ' + req.params.id)
  let song = music[req.params.id];
  if (!song) return res.sendError(AppError.notFound());
  return res.status(200).send(song);
});


musicRouter.get('/all', (req, res) => {
  serverLog('get all' + music);
  let musicCollection = Object.keys(music).map((id) => {
    return music[id];
  });
  res.status(200).json(musicCollection);
});

musicRouter.post('/', jsonParser, (req, res) => {
  serverLog('post' + req.body);
  if(req.body.artist && req.body.song) {
    let song = new Music(req.body.artist, req.body.song);
    music[song.id] = song;
    return res.status(200).json(music[song.id]);
  } else {
    return res.sendError(res.sendError(AppError.badRequest()));
  }
});

musicRouter.put('/:id', jsonParser, (req, res) => {
  serverLog('PUT id: ' + req.params.id + ' updated data ' + req.body);
  if (!req.body.song && !req.body.artist) return res.sendError(AppError.badRequest());
  if (!music[req.params.id]) return res.sendError(AppError.notFound());
  music[req.params.id].song = req.body.song;
  music[req.params.id].artist = req.body.artist;
  return res.status(200).json(music[req.params.id]);
});

musicRouter.delete('/:id', (req, res) => {
  serverLog('delete with id: ' + req.params.id);
  let songId = music[req.params.id];
  if (!songId) {
    return res.sendError(AppError.notFound());
  } else {
    delete music[songId];
    return res.status(200).json({msg: 'successful deletion'});
  }
});

module.exports = musicRouter;
