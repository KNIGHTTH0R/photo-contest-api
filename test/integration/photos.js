var request = require('supertest');
var Server = require('../../server')
var Contest = require('../../server/services/contest')

describe('Contest Photos API', function () {
  var app;
  beforeEach(function (next) {
    app = new Server();
    Contest.create('Test Contest', Date.now(), 'test');
    next();
  });

  afterEach(function (next) {
    Contest.destroy('test-contest');
    next();
  });

  it('should list media from instagram', function (done) {
    request(app)
      .get('/contests/test/photos')
      .end(function (err, res) {
        console.log(res.body)

        done()
      })
  })
})
