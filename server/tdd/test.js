const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const URL = 'http://localhost:4000/api'

chai.use(chaiHttp)

describe('App', function () {
  describe('GET: /hacktivoverflow', function () {
    it('responds with status 200', function (done) {
      chai.request(URL)
      .get('/hacktivoverflow')
      .end(function (err, res) {
        expect(res).to.have.status(200)
        done()
      })
    })
  })
})