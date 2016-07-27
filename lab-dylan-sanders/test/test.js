'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../server');
const Router = require('../route/music_router');

// const Music = require('../model/Music');

describe('The Router', function() {
  let router = Router();
  it('should be properly set up', function() {
    expect(router.baseUrl).to.eql('/api/music');
    expect(router.routes).to.be.an('object');
    expect(router.GET).to.be.an('object');
    expect(router.POST).to.be.an('object');
    expect(router.DELETE).to.be.an('object');
    expect(router.PATCH).to.be.an('object');
  });

  it('should call route functions', function() {
    let called;
    let testRes = {
      'test': true
    };
    let testReq = {
      method: 'GET',
      url: '/api/music/test'
    };
    this.router.get('/test', function(req, res) {
      called = true;
      expect(res.test).to.eql(true);
    });
    this.router.route(testReq, testRes);
    expect(called).to.eql(true);

  });

});
