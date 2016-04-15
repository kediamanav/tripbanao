'use strict';

var app = require('../../app');
var request = require('supertest');

var newHotel;

describe('Hotel API:', function() {

  describe('GET /api/hotels', function() {
    var hotels;

    beforeEach(function(done) {
      request(app)
        .get('/api/hotels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hotels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      hotels.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/hotels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/hotels')
        .send({
          name: 'New Hotel',
          info: 'This is the brand new hotel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newHotel = res.body;
          done();
        });
    });

    it('should respond with the newly created hotel', function() {
      newHotel.name.should.equal('New Hotel');
      newHotel.info.should.equal('This is the brand new hotel!!!');
    });

  });

  describe('GET /api/hotels/:id', function() {
    var hotel;

    beforeEach(function(done) {
      request(app)
        .get('/api/hotels/' + newHotel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          hotel = res.body;
          done();
        });
    });

    afterEach(function() {
      hotel = {};
    });

    it('should respond with the requested hotel', function() {
      hotel.name.should.equal('New Hotel');
      hotel.info.should.equal('This is the brand new hotel!!!');
    });

  });

  describe('PUT /api/hotels/:id', function() {
    var updatedHotel

    beforeEach(function(done) {
      request(app)
        .put('/api/hotels/' + newHotel._id)
        .send({
          name: 'Updated Hotel',
          info: 'This is the updated hotel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHotel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHotel = {};
    });

    it('should respond with the updated hotel', function() {
      updatedHotel.name.should.equal('Updated Hotel');
      updatedHotel.info.should.equal('This is the updated hotel!!!');
    });

  });

  describe('DELETE /api/hotels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/hotels/' + newHotel._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hotel does not exist', function(done) {
      request(app)
        .delete('/api/hotels/' + newHotel._id)
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
