const moment = require('moment');
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Models = require('../sequelize/models');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;
let id;

chai.use(chaiHttp);

describe('# Customer Tests', () => {
  describe('Create Customer', () => {
    before(done => {
      Models.Customer.destroy({ truncate: { cascade: true } })
        .then(() => done(null))
        .catch(error => done(error));
    });
    it('should return 201 status and created true', (done) => {
      chai.request(app)
        .post('/customers')
        .send({ name: 'Llyam'})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('created').to.be.true;
          id = res.body.customer.id;
          done()
        })
    });
  });

  describe('List Customers', () => {
    it('should return 200 status with customers list', (done) => {
      chai.request(app)
        .get('/customers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.include({ id, name: 'Llyam' });
          done()
        })
    });
  });

  describe('List Customer Transactions', () => {
    before(done => {
      chai.request(app)
        .post('/transactions')
        .send({
          store_name: 'Market',
          amount: 15000,
          split: 4,
          user_id: id
        })
        .end(() => done(null))
    });
    it('should return 200 status with customers transactions', (done) => {
      chai.request(app)
        .get(`/customers/${id}/transactions`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body[0].should.include({
            store_name: 'Market',
            amount: 15000,
            split: 4,
            customer_id: id
          });
          done()
        })
    });
  });
});