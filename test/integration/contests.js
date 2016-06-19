var should = require('should');
var request = require('supertest');
var Server = require('../../server');
var Contest = require('../../server/services/contest');

describe('Contests API', function () {
  var app;
  beforeEach(function (next) {
    app = new Server()
    Contest.create('Contest #1', Date.now(), 'one');
    Contest.create('Contest #2', Date.now(), 'two');
    next();
  });

  afterEach(function (next) {
    Contest.list().forEach(function (contest) {
      Contest.destroy(contest.slug);
    })
    next();
  });

  it('should list contests', function (done) {
    request(app)
      .get('/api/contests')
      .end(function (err, res) {
        res.body.should.be.an.Array;
        res.body.should.have.property('length').and.is.greaterThan(0);

        res.body[0].should.have.property('name').and.equal('Contest #1');
        res.body[0].should.have.property('slug').and.equal('contest-1');
        res.body[0].should.have.property('tag').and.equal('one');

        res.body[1].should.have.property('name').and.equal('Contest #2');
        res.body[1].should.have.property('slug').and.equal('contest-2');
        res.body[1].should.have.property('tag').and.equal('two');

        done();
      });
  });

  it('should create contest', function (done) {
    request(app)
      .post('/api/contests')
      .send({
        name: 'Created',
        startedAt: Date.now(),
        tag: 'creation'
      })
      .end(function (err, res) {
        res.body.should.be.an.Object;

        res.body.should.have.property('name').and.equal('Created');
        res.body.should.have.property('slug').and.equal('created');
        res.body.should.have.property('tag').and.equal('creation');

        contest = Contest.get('created')
        contest.tag.should.equal('creation')

        done();
      });
  })

  it('should get a contest', function (done) {
    request(app)
      .get('/api/contests/contest-1')
      .end(function (err, res) {
        res.body.should.be.an.Object;

        res.body.should.have.property('name').and.equal('Contest #1');
        res.body.should.have.property('slug').and.equal('contest-1');
        res.body.should.have.property('tag').and.equal('one');

        done();
      });
  })

  it('should delete a contest', function (done) {
    request(app)
      .delete('/api/contests/contest-1')
      .end(function (err, res) {
        res.body.should.be.an.Object;

        res.body.should.not.have.property('name');
        res.body.should.not.have.property('slug');
        res.body.should.not.have.property('tag');

        res.text.should.equal('');

        should.not.exist(Contest.get('contest-1'))

        done();
      });
  })
})
