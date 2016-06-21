var request = require('supertest');
var Server = require('../../server')
var Contest = require('../../server/services/contest')

describe('Contest Photos API', function () {
  var app;
  beforeEach(function (next) {
    app = new Server();
    Contest.create('Test Contest', Date.now(), 'esp8266');
    next();
  });

  afterEach(function (next) {
    Contest.destroy('test-contest');
    next();
  });

  it('should list media from instagram', function (done) {
    request(app)
      .get('/api/contests/test-contest/photos')
      .end(function (err, res) {
        console.log(JSON.stringify(res.body, null, 2))

        done()
      })
  })
})
