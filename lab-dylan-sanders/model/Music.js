const uuid = require('node-uuid');

module.exports = exports = function Music(artist, song) {
  this.id = uuid.v1();
  this.artist = artist;
  this.song = song;
};
