const uuid = require('node-uuid');

module.exports = exports = function Music(data) {
  this.id = uuid.v1();
  this.artist = data.artist;
  this.song = data.song;
};
