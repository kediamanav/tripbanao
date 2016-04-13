'use strict';

var app = require('../../app');
var request = require('supertest');

var newAgent;

describe('Agent API:', function() {

  describe('GET /api/agents', function() {
    var agents;

    beforeEach(function(done) {
      request(app)
        .get('/api/agents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          agents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      agents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/agents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/agents')
        .send({
          name: 'New Agent',
          info: 'This is the brand new agent!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAgent = res.body;
          done();
        });
    });

    it('should respond with the newly created agent', function() {
      newAgent.name.should.equal('New Agent');
      newAgent.info.should.equal('This is the brand new agent!!!');
    });

  });

  describe('GET /api/agents/:id', function() {
    var agent;

    beforeEach(function(done) {
      request(app)
        .get('/api/agents/' + newAgent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          agent = res.body;
          done();
        });
    });

    afterEach(function() {
      agent = {};
    });

    it('should respond with the requested agent', function() {
      agent.name.should.equal('New Agent');
      agent.info.should.equal('This is the brand new agent!!!');
    });

  });

  describe('PUT /api/agents/:id', function() {
    var updatedAgent

    beforeEach(function(done) {
      request(app)
        .put('/api/agents/' + newAgent._id)
        .send({
          name: 'Updated Agent',
          info: 'This is the updated agent!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAgent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAgent = {};
    });

    it('should respond with the updated agent', function() {
      updatedAgent.name.should.equal('Updated Agent');
      updatedAgent.info.should.equal('This is the updated agent!!!');
    });

  });

  describe('DELETE /api/agents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/agents/' + newAgent._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when agent does not exist', function(done) {
      request(app)
        .delete('/api/agents/' + newAgent._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
