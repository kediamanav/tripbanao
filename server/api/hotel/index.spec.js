'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var hotelCtrlStub = {
  index: 'hotelCtrl.index',
  show: 'hotelCtrl.show',
  create: 'hotelCtrl.create',
  update: 'hotelCtrl.update',
  destroy: 'hotelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var hotelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './hotel.controller': hotelCtrlStub
});

describe('Hotel API Router:', function() {

  it('should return an express router instance', function() {
    hotelIndex.should.equal(routerStub);
  });

  describe('GET /api/hotels', function() {

    it('should route to hotel.controller.index', function() {
      routerStub.get
                .withArgs('/', 'hotelCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/hotels/:id', function() {

    it('should route to hotel.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'hotelCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/hotels', function() {

    it('should route to hotel.controller.create', function() {
      routerStub.post
                .withArgs('/', 'hotelCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/hotels/:id', function() {

    it('should route to hotel.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'hotelCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/hotels/:id', function() {

    it('should route to hotel.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'hotelCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/hotels/:id', function() {

    it('should route to hotel.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'hotelCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
