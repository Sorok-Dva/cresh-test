const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Models = require('../sequelize/models');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('# Customer Tests', () => {
  describe('Create Customer', () => {
    before(done => {
      Models.Customer.destroy({ truncate: { cascade: true } }).catch(error => done(error));
      done();
    });
    it('should return 201 status and created true', (done) => {
      chai.request(app)
        .post('/customers')
        .send({ name: 'Llyam'})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys('created');
          done()
        })
    });
  });
});