'use strict';

const express = require('express');
const musicRouter = express.Router();
const Music = require('../model/Music');
const AppError = require('../lib/AppError');
const jsonParser = require('body-parser').json();

const music = {};

musicRouter.get('/:id', (req, res) => {
  let song = music[req.params.id];
  if (!song) return res.sendError(AppError.notFound());
  return res.status(200).send(song);
});


musicRouter.get('/all', (req, res) => {
  let musicCollection = Object.keys(music).map((id) => {
    return music[id];
  });
  res.status(200).json(musicCollection);
});

musicRouter.post('/', jsonParser, (req, res) => {
  if(req.body.artist && req.body.song) {
    let song = new Music(req.body.artist, req.body.song);
    music[song.id] = song;
    return res.status(200).json(music[song.id]);
  } else {
    return res.sendError(res.sendError(AppError.badRequest()));
  }
});

musicRouter.put('/:id', jsonParser, (req, res) => {
  if (!req.body.song && !req.body.artist) return res.sendError(AppError.badRequest());
  if (!music[req.params.id]) return res.sendError(AppError.notFound());
  music[req.params.id].song = req.body.song;
  music[req.params.id].artist = req.body.artist;
  return res.status(200).json(music[req.params.id]);
});

musicRouter.delete('/:id', (req, res) => {
  let songId = music[req.params.id];
  if (!songId) {
    return res.sendError(AppError.notFound());
  } else {
    delete music[songId];
    return res.status(200).json({msg: 'successful deletion'});
  }
});

module.exports = musicRouter;
