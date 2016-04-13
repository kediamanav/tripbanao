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
<<<<<<< HEAD
        .withArgs('/', 'agentCtrl.index')
        .should.have.been.calledOnce;
=======
                .withArgs('/', 'agentCtrl.index')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

  describe('GET /api/agents/:id', function() {

    it('should route to agent.controller.show', function() {
      routerStub.get
<<<<<<< HEAD
        .withArgs('/:id', 'agentCtrl.show')
        .should.have.been.calledOnce;
=======
                .withArgs('/:id', 'agentCtrl.show')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

  describe('POST /api/agents', function() {

    it('should route to agent.controller.create', function() {
      routerStub.post
<<<<<<< HEAD
        .withArgs('/', 'agentCtrl.create')
        .should.have.been.calledOnce;
=======
                .withArgs('/', 'agentCtrl.create')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

  describe('PUT /api/agents/:id', function() {

    it('should route to agent.controller.update', function() {
      routerStub.put
<<<<<<< HEAD
        .withArgs('/:id', 'agentCtrl.update')
        .should.have.been.calledOnce;
=======
                .withArgs('/:id', 'agentCtrl.update')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

  describe('PATCH /api/agents/:id', function() {

    it('should route to agent.controller.update', function() {
      routerStub.patch
<<<<<<< HEAD
        .withArgs('/:id', 'agentCtrl.update')
        .should.have.been.calledOnce;
=======
                .withArgs('/:id', 'agentCtrl.update')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

  describe('DELETE /api/agents/:id', function() {

    it('should route to agent.controller.destroy', function() {
      routerStub.delete
<<<<<<< HEAD
        .withArgs('/:id', 'agentCtrl.destroy')
        .should.have.been.calledOnce;
=======
                .withArgs('/:id', 'agentCtrl.destroy')
                .should.have.been.calledOnce;
>>>>>>> 35867dc503070c18322617052ee74cf8fa960a7d
    });

  });

});
