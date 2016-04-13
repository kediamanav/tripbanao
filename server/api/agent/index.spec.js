'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var agentCtrlStub = {
  index: 'agentCtrl.index',
  show: 'agentCtrl.show',
  create: 'agentCtrl.create',
  update: 'agentCtrl.update',
  destroy: 'agentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var agentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './agent.controller': agentCtrlStub
});

describe('Agent API Router:', function() {

  it('should return an express router instance', function() {
    agentIndex.should.equal(routerStub);
  });

  describe('GET /api/agents', function() {

    it('should route to agent.controller.index', function() {
      routerStub.get
        .withArgs('/', 'agentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/agents/:id', function() {

    it('should route to agent.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'agentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/agents', function() {

    it('should route to agent.controller.create', function() {
      routerStub.post
        .withArgs('/', 'agentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/agents/:id', function() {

    it('should route to agent.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'agentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/agents/:id', function() {

    it('should route to agent.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'agentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/agents/:id', function() {

    it('should route to agent.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'agentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
