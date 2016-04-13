'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var flightCtrlStub = {
  index: 'flightCtrl.index',
  show: 'flightCtrl.show',
  create: 'flightCtrl.create',
  update: 'flightCtrl.update',
  destroy: 'flightCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var flightIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './flight.controller': flightCtrlStub
});

describe('Flight API Router:', function() {

  it('should return an express router instance', function() {
    flightIndex.should.equal(routerStub);
  });

  describe('GET /api/flights', function() {

    it('should route to flight.controller.index', function() {
      routerStub.get
                .withArgs('/', 'flightCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/flights/:id', function() {

    it('should route to flight.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'flightCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/flights', function() {

    it('should route to flight.controller.create', function() {
      routerStub.post
                .withArgs('/', 'flightCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/flights/:id', function() {

    it('should route to flight.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'flightCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/flights/:id', function() {

    it('should route to flight.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'flightCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/flights/:id', function() {

    it('should route to flight.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'flightCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
