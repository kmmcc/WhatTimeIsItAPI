var chai = require('chai');
var chaiHttp = require('chai-http');
var index = require('../server/index.js');

var expect = chai.expect;

chai.use(chaiHttp);

describe('Response Code', function() {
  it('Return a 200 status code.', function(done) {
    chai.request(index.app)
    .get('/whattimeisit')
    .end(function (err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  })
});
