const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Models = require('../sequelize/models');
const app = require('../app');
const should = chai.should();
const expect = chai.expect;
let id, customer_id, instalments;
chai.use(chaiHttp);

describe('# Transactions Tests', () => {
  describe('Create Transaction', () => {
    before(done => {
      Models.Transaction.destroy({ truncate: { cascade: true } })
        .then(() => {
          return Models.Customer.findOne({ where: { name: 'Llyam '}})
        })
        .then(customer => {
          customer_id = customer.id;
          done(null)
        })
        .catch(error => done(error));
    });
    it('should return 201 status with transactions and instalments', (done) => {
      chai.request(app)
        .post('/transactions')
        .send({
          store_name: 'Market',
          amount: 15000,
          split: 4,
          user_id: customer_id
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('created').to.be.true;
          res.body.should.have.property('transaction').to.be.an('object');
          res.body.should.have.property('instalments').to.be.an('array').to.have.lengthOf(4);
          id = res.body.transaction.id;
          instalments = res.body.transaction.split;
          done();
        })
    });
    it('should return 400 status with specific errors', (done) => {
      chai.request(app)
        .post('/transactions')
        .send({
          store_name: null,
          amount: '25',
          split: 0,
          user_id: customer_id
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('errors').to.be.an('array');
          res.body.errors[0].should.have.property('msg', 'Store Name cannot be empty.');
          res.body.errors[1].should.have.property('msg', 'Split should be numeric and greater than 1.');
          done();
        })
    });
  });

  describe('List Transaction Instalments', () => {
    it('should return 200 status with transaction Instalments', (done) => {
      chai.request(app)
        .get(`/transactions/${id}/instalments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(instalments);
          done()
        })
    });
    it('should return 404 NOT FOUND error', (done) => {
      chai.request(app)
        .get(`/transactions/65543335435/instalments`)
        .end((err, res) => {
          res.should.have.status(404);
          done()
        })
    });
  });

  describe('Trigger Transaction Instalments', () => {
    it('should return 200 status with transaction data and upcoming instalments array (3 rows)', (done) => {
      chai.request(app)
        .put(`/transactions/${id}/instalments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
            .to.have.property('transaction')
            .to.have.property('instalments').to.have.lengthOf(instalments - 1);
          done()
        })
    });
    it('should return 200 status with transaction data and upcoming instalments array (2 rows)', (done) => {
      chai.request(app)
        .put(`/transactions/${id}/instalments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
            .to.have.property('transaction')
            .to.have.property('instalments').to.have.lengthOf(instalments - 2);
          done()
        })
    });
    it('should return 200 status with transaction data and upcoming instalments array (1 row)', (done) => {
      chai.request(app)
        .put(`/transactions/${id}/instalments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
            .to.have.property('transaction')
            .to.have.property('instalments').to.have.lengthOf(instalments - 3);
          done()
        })
    });
    it('should return 200 status with transaction data with no more upcoming instalments & is_completed = true ',
      (done) => {
      chai.request(app)
        .put(`/transactions/${id}/instalments`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
            .to.have.property('transaction')
            .to.have.property('instalments').to.have.lengthOf(0);
          res.body.transaction.should.have.property('is_completed').to.be.true;
          done()
        })
    });
  });

});