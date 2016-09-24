'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

require('../server');

describe('Routes CRUD tests', function() {
  let testId;
  before(function(done) {
    request('localhost:3000')
    .post('/api/music/')
    .send({artist: 'testArtist', song: 'testSong'})
    .end(function(err, res) {
      console.log(res.body.id);
      testId = res.body.id;
      done();
    });
  });

  it('should make a get request on a song with testId', function(done) {
    request('localhost:3000')
    .get('/api/music/' + testId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should make a not found get request', function(done) {
    request('localhost:3000')
    .get('/api/music/badID')
    .end(function(err, res) {
      expect(err).to.not.eql(null);
      expect(err.status).to.eql(404);
      expect(err.message).to.eql('Not Found');
      done();
    });
  });

  it('should make a bad get request with no id', function(done) {
    request('localhost:3000')
    .get('/api/music/')
    .end(function(err, res) {
      expect(err).to.not.eql(null);
      expect(err.status).to.eql(400);
      expect(err.message).to.eql('Bad Request');
      done();
    });
  });

  it('should make a POST request', function(done) {
    request('localhost:3000')
    .post('/api/music')
    .send({song: 'postTestSong', artist: 'postTestArtist'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.id).to.not.eql(undefined);
      done();
    });
  });

  it('should make a bad POST request', function(done) {
    request('localhost:3000')
    .post('/api/music')
    .send({})
    .end(function(err, res) {
      expect(err).to.not.eql(null);
      expect(err).to.have.status(400);
      done();
    });
  });

  it('should make a PUT request', function(done) {
    request('localhost:3000')
    .put('/api/music/' + testId)
    .send({song: 'putTestSong', artist: 'putTestArtist'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.id).to.not.eql(undefined);
      done();
    });
  });

  it('should make a bad PUT request', function(done) {
    request('localhost:3000')
    .post('/api/music/' + testId)
    .send({})
    .end(function(err, res) {
      expect(err).to.not.eql(null);
      expect(err).to.have.status(400);
      done();
    });
  });

  


  // it('should be properly set up', function() {
  //   expect(router.baseUrl).to.eql('/api/music');
  //   expect(router.routes).to.be.an('object');
  //   expect(router.GET).to.be.an('object');
  //   expect(router.POST).to.be.an('object');
  //   expect(router.DELETE).to.be.an('object');
  //   expect(router.PATCH).to.be.an('object');
  // });

  // it('should call route functions', function() {
  //   let called;
  //   let testRes = {
  //     'test': true
  //   };
  //   let testReq = {
  //     method: 'GET',
  //     url: '/api/music/test'
  //   };
  //   this.router.get('/test', function(req, res) {
  //     called = true;
  //     expect(res.test).to.eql(true);
  //   });
  //   this.router.route(testReq, testRes);
  //   expect(called).to.eql(true);

  // });

});
